<?php
/**
 * Configuration Email - Ra7oox Portfolio
 * Configurez vos paramètres d'email ici
 */

return [
    // Informations du destinataire
    'recipient' => [
        'email' => 'soufianearrahou7@gmail.com',
        'name' => 'Soufiane Arrahou'
    ],
    
    // Configuration SMTP
    'smtp' => [
        'host' => 'smtp.gmail.com',          // Serveur SMTP
        'port' => 587,                        // Port SMTP (587 pour TLS, 465 pour SSL)
        'encryption' => 'tls',                // 'tls' ou 'ssl'
        'auth' => true,                       // Activer l'authentification
        'username' => 'iarrahou@gmail.com', // Votre email Gmail
        'password' => 'icpk qdht yerw lzqo' // Mot de passe d'application
    ],
    
    // Autres configurations SMTP populaires :
    
    // SendGrid
    /*
    'smtp' => [
        'host' => 'smtp.sendgrid.net',
        'port' => 587,
        'encryption' => 'tls',
        'auth' => true,
        'username' => 'apikey',
        'password' => 'votre-api-key-sendgrid'
    ],
    */
    
    // Mailgun
    /*
    'smtp' => [
        'host' => 'smtp.mailgun.org',
        'port' => 587,
        'encryption' => 'tls',
        'auth' => true,
        'username' => 'votre-username-mailgun',
        'password' => 'votre-password-mailgun'
    ],
    */
    
    // Amazon SES
    /*
    'smtp' => [
        'host' => 'email-smtp.us-east-1.amazonaws.com',
        'port' => 587,
        'encryption' => 'tls',
        'auth' => true,
        'username' => 'votre-aws-access-key',
        'password' => 'votre-aws-secret-key'
    ],
    */
    
    // Paramètres du site
    'site' => [
        'name' => 'Ra7oox Portfolio',
        'url' => 'https://ra7oox.github.io/my-portfolio/'
    ],
    
    // Options de sécurité
    'security' => [
        'rate_limit' => [
            'enabled' => true,
            'max_requests' => 5,      // Maximum de messages
            'time_window' => 3600     // Par heure (en secondes)
        ],
        'honeypot' => true,           // Protection anti-spam
        'csrf_protection' => false    // Protection CSRF (optionnel)
    ],
    
    // Options d'email
    'email' => [
        'charset' => 'UTF-8',
        'debug' => 0,                 // 0 = off, 1 = client, 2 = client et serveur, 3 = détaillé
        'html' => true,               // Envoyer en HTML
        'priority' => 1               // 1 = High, 3 = Normal, 5 = Low
    ],
    
    // Logging
    'logging' => [
        'enabled' => true,
        'file' => 'contact_log.txt'
    ]
];