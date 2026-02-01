<?php
/**
 * Contact Form Handler with PHPMailer (SMTP)
 * More reliable email delivery with SMTP authentication
 * 
 * INSTALLATION:
 * 1. Install Composer: https://getcomposer.org/
 * 2. Run: composer require phpmailer/phpmailer
 * 3. Configure SMTP settings below
 */

// Uncomment after installing PHPMailer via Composer
// require 'vendor/autoload.php';
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// ============ CONFIGURATION ============
define('RECIPIENT_EMAIL', 'soufianearrahou7@gmail.com');
define('RECIPIENT_NAME', 'Soufiane Arrahou');
define('SITE_NAME', 'Ra7oox Portfolio');

// SMTP Configuration (pour Gmail)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'iarrahpu@gmail.com'); // Remplacez par votre email
define('SMTP_PASSWORD', 'icpk qdht yerw lzqo'); // Mot de passe d'application Google
define('SMTP_ENCRYPTION', 'tls'); // 'tls' ou 'ssl'

// Alternative: Autres fournisseurs SMTP
// SendGrid: smtp.sendgrid.net, port 587
// Mailgun: smtp.mailgun.org, port 587
// Amazon SES: email-smtp.region.amazonaws.com, port 587

// ============ SECURITY ============
session_start();

// Generate CSRF token if not exists
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// ============ FUNCTIONS ============
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function send_response($success, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function is_spam($name, $email, $message) {
    // Check for common spam patterns
    $spam_words = ['viagra', 'casino', 'lottery', 'porn', 'xxx'];
    $text = strtolower($name . ' ' . $email . ' ' . $message);
    
    foreach ($spam_words as $word) {
        if (strpos($text, $word) !== false) {
            return true;
        }
    }
    
    // Check for too many links
    if (substr_count($message, 'http') > 3) {
        return true;
    }
    
    return false;
}

// ============ RATE LIMITING ============
function check_rate_limit($ip) {
    $limit_file = 'rate_limit.json';
    $max_requests = 5; // Maximum 5 messages
    $time_window = 3600; // Per hour
    
    $data = [];
    if (file_exists($limit_file)) {
        $data = json_decode(file_get_contents($limit_file), true);
    }
    
    $current_time = time();
    
    // Clean old entries
    foreach ($data as $stored_ip => $info) {
        if ($current_time - $info['first_request'] > $time_window) {
            unset($data[$stored_ip]);
        }
    }
    
    // Check current IP
    if (isset($data[$ip])) {
        if ($data[$ip]['count'] >= $max_requests) {
            $time_left = $time_window - ($current_time - $data[$ip]['first_request']);
            send_response(false, "Trop de requêtes. Veuillez réessayer dans " . ceil($time_left / 60) . " minutes.");
        }
        $data[$ip]['count']++;
    } else {
        $data[$ip] = [
            'first_request' => $current_time,
            'count' => 1
        ];
    }
    
    file_put_contents($limit_file, json_encode($data));
}

// ============ MAIN LOGIC ============
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Check rate limit
    $ip = $_SERVER['REMOTE_ADDR'];
    check_rate_limit($ip);
    
    // Verify CSRF token (optional, uncomment to enable)
    // if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    //     send_response(false, "Invalid security token");
    // }
    
    // Check honeypot (add hidden field in HTML: <input type="text" name="website" style="display:none">)
    if (!empty($_POST['website'])) {
        send_response(false, "Spam detected");
    }
    
    $errors = [];
    
    // Get and sanitize data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // Validate
    if (empty($name) || strlen($name) < 2) {
        $errors[] = "Nom invalide";
    }
    
    if (empty($email) || !validate_email($email)) {
        $errors[] = "Email invalide";
    }
    
    if (empty($subject) || strlen($subject) < 5) {
        $errors[] = "Sujet trop court";
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = "Message trop court";
    }
    
    // Check for spam
    if (is_spam($name, $email, $message)) {
        send_response(false, "Message détecté comme spam");
    }
    
    if (!empty($errors)) {
        send_response(false, implode(', ', $errors));
    }
    
    // Prepare email content
    $email_subject = "[" . SITE_NAME . "] " . $subject;
    
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { padding: 30px; }
            .info-row { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #00D9FF; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
            .value { color: #333; font-size: 16px; }
            .message-box { background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #00D9FF; margin-top: 10px; white-space: pre-wrap; }
            .footer { background: #0A0E27; color: #9BA4B5; padding: 20px; text-align: center; font-size: 14px; }
            .footer a { color: #00D9FF; text-decoration: none; }
            .btn { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; text-decoration: none; border-radius: 50px; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>📧 Nouveau Message de Contact</h1>
            </div>
            <div class='content'>
                <div class='info-row'>
                    <div class='label'>👤 Nom</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>📧 Email</div>
                    <div class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></div>
                </div>
                <div class='info-row'>
                    <div class='label'>📋 Sujet</div>
                    <div class='value'>" . htmlspecialchars($subject) . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>💬 Message</div>
                    <div class='message-box'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>🌐 IP Address</div>
                    <div class='value'>" . $_SERVER['REMOTE_ADDR'] . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>🕐 Date & Heure</div>
                    <div class='value'>" . date('d/m/Y à H:i:s') . "</div>
                </div>
                <a href='mailto:" . htmlspecialchars($email) . "' class='btn'>Répondre à " . htmlspecialchars($name) . "</a>
            </div>
            <div class='footer'>
                <p>Ce message a été envoyé depuis le formulaire de contact de <strong>" . SITE_NAME . "</strong></p>
                <p>IP: " . $_SERVER['REMOTE_ADDR'] . " | User Agent: " . htmlspecialchars($_SERVER['HTTP_USER_AGENT']) . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // ============ SEND EMAIL ============
    
    // METHOD 1: Using PHPMailer (Recommended - uncomment after installing)
    /*
    try {
        $mail = new PHPMailer(true);
        
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_ENCRYPTION;
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';
        
        // Recipients
        $mail->setFrom(SMTP_USERNAME, SITE_NAME);
        $mail->addAddress(RECIPIENT_EMAIL, RECIPIENT_NAME);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $email_subject;
        $mail->Body    = $email_body;
        $mail->AltBody = strip_tags($email_body);
        
        $mail->send();
        
        // Log
        $log_message = date('Y-m-d H:i:s') . " | SUCCESS | From: $email | Subject: $subject | IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
        @file_put_contents('contact_log.txt', $log_message, FILE_APPEND);
        
        send_response(true, "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.");
        
    } catch (Exception $e) {
        $log_message = date('Y-m-d H:i:s') . " | ERROR | " . $mail->ErrorInfo . "\n";
        @file_put_contents('contact_log.txt', $log_message, FILE_APPEND);
        
        send_response(false, "Erreur lors de l'envoi: " . $mail->ErrorInfo);
    }
    */
    
    // METHOD 2: Using PHP mail() function (Fallback)
    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "From: " . SITE_NAME . " <noreply@" . $_SERVER['HTTP_HOST'] . ">";
    $headers[] = "Reply-To: " . $name . " <" . $email . ">";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    
    $mail_sent = mail(RECIPIENT_EMAIL, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        $log_message = date('Y-m-d H:i:s') . " | SUCCESS | From: $email | Subject: $subject | IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
        @file_put_contents('contact_log.txt', $log_message, FILE_APPEND);
        
        send_response(true, "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.");
    } else {
        $log_message = date('Y-m-d H:i:s') . " | ERROR | mail() failed | From: $email\n";
        @file_put_contents('contact_log.txt', $log_message, FILE_APPEND);
        
        send_response(false, "Une erreur est survenue. Veuillez réessayer ou me contacter directement.");
    }
    
} else {
    header('Location: index.html');
    exit;
}
?>