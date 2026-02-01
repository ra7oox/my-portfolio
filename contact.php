<?php
/**
 * Contact Form Handler - Version Hybride
 * Fonctionne AVEC PHPMailer (si installé) OU avec mail() PHP
 */

// Prevent any output before JSON
    
ob_start();

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set JSON header
header('Content-Type: application/json; charset=utf-8');

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

/**
 * Send JSON response
 */
function send_response($success, $message, $data = []) {
    ob_clean();
    
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Sanitize input
 */
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email
 */
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Log message
 */
function log_message($message) {
    $log_entry = date('Y-m-d H:i:s') . " | " . $message . "\n";
    @file_put_contents('contact_log.txt', $log_entry, FILE_APPEND);
}

/**
 * Check rate limit
 */
function check_rate_limit($ip) {
    $limit_file = 'rate_limit.json';
    $max_requests = 5;
    $time_window = 3600; // 1 hour
    
    $data = [];
    if (file_exists($limit_file)) {
        $data = json_decode(file_get_contents($limit_file), true) ?: [];
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
    
    @file_put_contents($limit_file, json_encode($data));
}

/**
 * Send email with PHPMailer or fallback to mail()
 */
function send_email($name, $email, $subject, $message) {
    // Try to load config
    $config = null;
    if (file_exists('config.php')) {
        $config = @include 'config.php';
    }
    
    // Check if PHPMailer is available and configured
    $use_phpmailer = false;
    if (file_exists('vendor/autoload.php') && $config && 
        isset($config['smtp']['username']) && 
        $config['smtp']['username'] !== 'votre-email@gmail.com') {
        
        require __DIR__ . '/vendor/autoload.php';

        
        if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
            $use_phpmailer = true;
        }
    }
    
    // Prepare email content
    $to_email = $config ? $config['recipient']['email'] : 'soufianearrahou7@gmail.com';
    $to_name = $config ? $config['recipient']['name'] : 'Soufiane Arrahou';
    $site_name = $config ? $config['site']['name'] : 'Ra7oox Portfolio';
    
    $email_subject = "[$site_name] $subject";
    
    // HTML Email Template
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { padding: 40px 30px; }
            .info-row { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: 600; color: #00D9FF; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 1.5px; }
            .value { color: #333; font-size: 16px; }
            .value a { color: #00D9FF; text-decoration: none; }
            .message-box { background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #00D9FF; margin-top: 10px; white-space: pre-wrap; }
            .footer { background: #0A0E27; color: #9BA4B5; padding: 30px; text-align: center; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>📧 Nouveau Message</h1>
            </div>
            <div class='content'>
                <div class='info-row'>
                    <div class='label'>👤 Nom</div>
                    <div class='value'>" . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>📧 Email</div>
                    <div class='value'><a href='mailto:" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "'>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</a></div>
                </div>
                <div class='info-row'>
                    <div class='label'>📋 Sujet</div>
                    <div class='value'>" . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>💬 Message</div>
                    <div class='message-box'>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</div>
                </div>
                <div class='info-row'>
                    <div class='label'>🕐 Date</div>
                    <div class='value'>" . date('d/m/Y à H:i:s') . "</div>
                </div>
            </div>
            <div class='footer'>
                <p><strong>$site_name</strong></p>
                <p>Ce message a été envoyé depuis le formulaire de contact.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Try PHPMailer first
    if ($use_phpmailer) {
        try {
        
            
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

            
            // SMTP Configuration
            $mail->isSMTP();
            $mail->Host       = $config['smtp']['host'];
            $mail->SMTPAuth   = $config['smtp']['auth'];
            $mail->Username   = $config['smtp']['username'];
            $mail->Password   = $config['smtp']['password'];
            $mail->SMTPSecure = $config['smtp']['encryption'];
            $mail->Port       = $config['smtp']['port'];
            $mail->CharSet    = 'UTF-8';
            
            // Recipients
            $mail->setFrom($config['smtp']['username'], $site_name);
            $mail->addAddress($to_email, $to_name);
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = $email_subject;
            $mail->Body    = $email_body;
            $mail->AltBody = "Nom: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";
            
            $mail->send();
            
            log_message("SUCCESS (PHPMailer) | From: $email | Subject: $subject");
            return [true, "Message envoyé avec succès via PHPMailer !"];
            
        } catch (Exception $e) {
            log_message("ERROR (PHPMailer) | " . $mail->ErrorInfo);
            // Fall back to mail()
        }
    }
    
    // Fallback to PHP mail()
    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    $headers[] = "From: $site_name <noreply@" . $_SERVER['HTTP_HOST'] . ">";
    $headers[] = "Reply-To: $name <$email>";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    
    $mail_sent = @mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        log_message("SUCCESS (PHP mail) | From: $email | Subject: $subject");
        return [true, "Merci pour votre message ! Je vous répondrai dans les plus brefs délais."];
    } else {
        log_message("ERROR (PHP mail) | Failed to send | From: $email");
        return [false, "Erreur lors de l'envoi. Veuillez me contacter directement à $to_email"];
    }
}

// ============ MAIN LOGIC ============

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $ip = $_SERVER['REMOTE_ADDR'];
    
    // Check rate limit
    check_rate_limit($ip);
    
    // Check honeypot
    if (!empty($_POST['website'])) {
        log_message("SPAM BLOCKED | Honeypot | IP: $ip");
        send_response(false, "Spam détecté");
    }
    
    // Validate inputs
    $errors = [];
    
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    if (empty($name) || strlen($name) < 2) {
        $errors[] = "Le nom doit contenir au moins 2 caractères";
    }
    
    if (empty($email) || !validate_email($email)) {
        $errors[] = "L'adresse email n'est pas valide";
    }
    
    if (empty($subject) || strlen($subject) < 5) {
        $errors[] = "Le sujet doit contenir au moins 5 caractères";
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = "Le message doit contenir au moins 10 caractères";
    }
    
    if (!empty($errors)) {
        send_response(false, implode(', ', $errors));
    }
    
    // Send email
    list($success, $msg) = send_email($name, $email, $subject, $message);
    send_response($success, $msg, ['sent_at' => date('Y-m-d H:i:s')]);
    
} else {
    send_response(false, "Méthode non autorisée");
}