<?php
/**
 * Test Script - Vérification de PHPMailer
 * Exécutez ce fichier pour tester votre configuration
 */
use PHPMailer\PHPMailer\PHPMailer;
            use PHPMailer\PHPMailer\Exception;
echo "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Test PHPMailer - Ra7oox Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        h1 { color: #00D9FF; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .test-item { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .btn { display: inline-block; padding: 10px 20px; background: #00D9FF; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px 10px 0; }
        .btn:hover { background: #00A8CC; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>";

echo "<h1>🔍 Test de Configuration PHPMailer</h1>";
echo "<p>Ce script teste votre installation de PHPMailer et votre configuration SMTP.</p>";
echo "<hr>";

$allTestsPassed = true;

// Test 1: PHP Version
echo "<div class='test-item'>";
echo "<h2>1. Version PHP</h2>";
if (version_compare(phpversion(), '7.0.0', '>=')) {
    echo "<div class='success'>✅ PHP " . phpversion() . " - OK</div>";
} else {
    echo "<div class='error'>❌ PHP " . phpversion() . " - Version trop ancienne (7.0+ requis)</div>";
    $allTestsPassed = false;
}
echo "</div>";

// Test 2: Composer autoload
echo "<div class='test-item'>";
echo "<h2>2. PHPMailer Installation</h2>";
if (file_exists('vendor/autoload.php')) {
    echo "<div class='success'>✅ vendor/autoload.php trouvé - PHPMailer est installé</div>";
    
    require 'vendor/autoload.php';
    
    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        echo "<div class='success'>✅ Classe PHPMailer chargée avec succès</div>";
    } else {
        echo "<div class='error'>❌ Impossible de charger la classe PHPMailer</div>";
        $allTestsPassed = false;
    }
} else {
    echo "<div class='error'>❌ PHPMailer non installé</div>";
    echo "<div class='info'>";
    echo "<strong>Pour installer PHPMailer :</strong><br>";
    echo "1. Installez Composer: <code>curl -sS https://getcomposer.org/installer | php</code><br>";
    echo "2. Exécutez: <code>composer install</code>";
    echo "</div>";
    $allTestsPassed = false;
}
echo "</div>";

// Test 3: Config file
echo "<div class='test-item'>";
echo "<h2>3. Fichier de Configuration</h2>";
if (file_exists('config.php')) {
    echo "<div class='success'>✅ config.php trouvé</div>";
    
    $config = require 'config.php';
    
    if (isset($config['smtp']['username']) && $config['smtp']['username'] !== 'votre-email@gmail.com') {
        echo "<div class='success'>✅ Configuration SMTP personnalisée</div>";
    } else {
        echo "<div class='error'>⚠️ Configuration SMTP non personnalisée</div>";
        echo "<div class='info'>Modifiez <code>config.php</code> avec vos identifiants SMTP</div>";
    }
    
    echo "<div class='info'><strong>Configuration actuelle :</strong><br>";
    echo "Host: <code>" . $config['smtp']['host'] . "</code><br>";
    echo "Port: <code>" . $config['smtp']['port'] . "</code><br>";
    echo "Username: <code>" . $config['smtp']['username'] . "</code><br>";
    echo "Password: <code>" . (strlen($config['smtp']['password']) > 5 ? '****** (configuré)' : 'NON CONFIGURÉ') . "</code>";
    echo "</div>";
} else {
    echo "<div class='error'>❌ config.php non trouvé</div>";
    $allTestsPassed = false;
}
echo "</div>";

// Test 4: Extensions PHP
echo "<div class='test-item'>";
echo "<h2>4. Extensions PHP Requises</h2>";
$extensions = ['openssl', 'mbstring'];
foreach ($extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "<div class='success'>✅ Extension <code>$ext</code> activée</div>";
    } else {
        echo "<div class='error'>❌ Extension <code>$ext</code> manquante</div>";
        $allTestsPassed = false;
    }
}
echo "</div>";

// Test 5: Permissions
echo "<div class='test-item'>";
echo "<h2>5. Permissions des Fichiers</h2>";
$files_to_check = ['contact_log.txt', 'rate_limit.json'];
foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        if (is_writable($file)) {
            echo "<div class='success'>✅ <code>$file</code> est accessible en écriture</div>";
        } else {
            echo "<div class='error'>⚠️ <code>$file</code> n'est pas accessible en écriture</div>";
        }
    } else {
        $test = @file_put_contents($file, "");
        if ($test !== false) {
            echo "<div class='success'>✅ Peut créer <code>$file</code></div>";
        } else {
            echo "<div class='error'>❌ Ne peut pas créer <code>$file</code></div>";
        }
    }
}
echo "</div>";

// Test 6: Test d'envoi SMTP
if (file_exists('vendor/autoload.php') && file_exists('config.php')) {
    echo "<div class='test-item'>";
    echo "<h2>6. Test d'Envoi Email</h2>";
    
    if (isset($_GET['send_test']) && $_GET['send_test'] === '1') {
        try {
            
            
            $config = require 'config.php';
            $mail = new PHPMailer(true);
            
            // Configuration
            $mail->isSMTP();
            $mail->Host       = $config['smtp']['host'];
            $mail->SMTPAuth   = $config['smtp']['auth'];
            $mail->Username   = $config['smtp']['username'];
            $mail->Password   = $config['smtp']['password'];
            $mail->SMTPSecure = $config['smtp']['encryption'];
            $mail->Port       = $config['smtp']['port'];
            $mail->CharSet    = 'UTF-8';
            
            // Destinataires
            $mail->setFrom($config['smtp']['username'], 'Test Ra7oox Portfolio');
            $mail->addAddress($config['recipient']['email'], $config['recipient']['name']);
            
            // Contenu
            $mail->isHTML(true);
            $mail->Subject = 'Test PHPMailer - ' . date('d/m/Y H:i:s');
            $mail->Body    = '<h1>✅ Test Réussi!</h1><p>Votre configuration PHPMailer fonctionne correctement.</p><p>Envoyé le: ' . date('d/m/Y à H:i:s') . '</p>';
            $mail->AltBody = 'Test réussi! Votre configuration PHPMailer fonctionne.';
            
            $mail->send();
            
            echo "<div class='success'>";
            echo "<h3>✅ Email de test envoyé avec succès!</h3>";
            echo "<p>Vérifiez votre boîte de réception : <strong>" . $config['recipient']['email'] . "</strong></p>";
            echo "<p>Si vous ne voyez pas l'email, vérifiez votre dossier spam.</p>";
            echo "</div>";
            
        } catch (Exception $e) {
            echo "<div class='error'>";
            echo "<h3>❌ Échec de l'envoi</h3>";
            echo "<p><strong>Erreur:</strong> " . $mail->ErrorInfo . "</p>";
            echo "<p><strong>Causes possibles:</strong></p>";
            echo "<ul>";
            echo "<li>Identifiants SMTP incorrects</li>";
            echo "<li>Port bloqué par le firewall</li>";
            echo "<li>Authentification à 2 facteurs non configurée (Gmail)</li>";
            echo "<li>Mot de passe d'application non généré (Gmail)</li>";
            echo "</ul>";
            echo "</div>";
            $allTestsPassed = false;
        }
    } else {
        echo "<div class='info'>";
        echo "<p>Cliquez sur le bouton ci-dessous pour envoyer un email de test :</p>";
        echo "<a href='?send_test=1' class='btn'>📧 Envoyer un Email de Test</a>";
        echo "</div>";
    }
    echo "</div>";
}

// Résumé
echo "<hr>";
echo "<div class='test-item'>";
echo "<h2>📊 Résumé</h2>";
if ($allTestsPassed && isset($_GET['send_test'])) {
    echo "<div class='success'>";
    echo "<h3>🎉 Tous les tests sont passés!</h3>";
    echo "<p>Votre système de contact est prêt à être utilisé.</p>";
    echo "</div>";
} elseif ($allTestsPassed) {
    echo "<div class='info'>";
    echo "<h3>⚠️ Configuration OK, mais test d'envoi non effectué</h3>";
    echo "<p>Cliquez sur le bouton 'Envoyer un Email de Test' ci-dessus.</p>";
    echo "</div>";
} else {
    echo "<div class='error'>";
    echo "<h3>❌ Certains tests ont échoué</h3>";
    echo "<p>Veuillez corriger les erreurs ci-dessus avant de continuer.</p>";
    echo "</div>";
}
echo "</div>";

// Actions
echo "<hr>";
echo "<h2>🔧 Actions Rapides</h2>";
echo "<a href='index.html' class='btn'>🏠 Retour au Portfolio</a>";
echo "<a href='?send_test=1' class='btn'>📧 Test Email</a>";
echo "<a href='test-phpmailer.php' class='btn'>🔄 Recharger</a>";

echo "<hr>";
echo "<p style='text-align:center; color:#666;'>";
echo "Ra7oox Portfolio - Test PHPMailer<br>";
echo "Pour plus d'aide, consultez <code>INSTALLATION.md</code>";
echo "</p>";

echo "</body></html>";
?>