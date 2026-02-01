<?php
// mail.config.php
// Copy this file and customize with your SMTP credentials. Do NOT commit secrets publicly.
return [
    'smtp' => [
        // Gmail SMTP configuration
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'secure' => 'tls', // 'tls' or 'ssl'
        'username' => 'sallahdzor@gmail.com',
        'password' => 'qaesvlcriggatopb'
    ],
    'from_email' => 'sallahdzor@gmail.com',
    'from_name'  => 'Sallah D. Joshua',
    'to_email'   => 'sallahdzor@gmail.com',
    'to_name'    => 'Sallah D. Joshua',
];
