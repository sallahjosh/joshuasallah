<?php
// contact.php - PHPMailer-based contact endpoint
// Path: c:/xampp/htdocs/myportfolio/contact.php

// Start output buffering and ensure only JSON is returned
ob_start();
ini_set('display_errors', '0');
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
header('Content-Type: application/json');

// Log errors to help with debugging
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/php_errors.log');

function respond_json(int $code, array $payload): void {
    http_response_code($code);
    if (ob_get_length()) { ob_clean(); }
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_json(405, ['ok' => false, 'error' => 'Method Not Allowed']);
}

// Basic sanitization helper
function sanitize_text($value) {
    $value = trim($value ?? '');
    $value = str_replace(["\r", "\n"], ' ', $value); // prevent header injection
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$name    = sanitize_text($_POST['name'] ?? '');
$email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$subject = sanitize_text($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate required fields
$errors = [];
if ($name === '')    { $errors[] = 'Name is required.'; }
if (!$email)         { $errors[] = 'A valid email is required.'; }
if ($subject === '') { $errors[] = 'Subject is required.'; }
if ($message === '') { $errors[] = 'Message is required.'; }

if (!empty($errors)) {
    respond_json(400, ['ok' => false, 'error' => implode(' ', $errors)]);
}

// Load config
$configPath = __DIR__ . DIRECTORY_SEPARATOR . 'mail.config.php';
if (!file_exists($configPath)) {
    respond_json(500, ['ok' => false, 'error' => 'Missing mail.config.php. Please create it with your SMTP credentials.']);
}
$cfg = require $configPath;

// Try to load Composer autoload for PHPMailer
$autoload = __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
if (file_exists($autoload)) {
    require $autoload;
} else {
    // Fallback: attempt to load from a manually downloaded PHPMailer in phpmailer/src
    $phpMailerSrc = __DIR__ . DIRECTORY_SEPARATOR . 'phpmailer' . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR;
    $need = ['PHPMailer.php', 'SMTP.php', 'Exception.php'];
    $allExist = true;
    foreach ($need as $f) {
        if (!file_exists($phpMailerSrc . $f)) { $allExist = false; break; }
    }
    if ($allExist) {
        require $phpMailerSrc . 'Exception.php';
        require $phpMailerSrc . 'PHPMailer.php';
        require $phpMailerSrc . 'SMTP.php';
    } else {
        respond_json(500, [
            'ok' => false,
            'error' => 'PHPMailer not available. Either run "composer require phpmailer/phpmailer" or download the PHPMailer ZIP and extract the src folder to "phpmailer/" in the project root.'
        ]);
    }
}

try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
} catch (Exception $e) {
    error_log("PHPMailer instantiation failed: " . $e->getMessage());
    respond_json(500, ['ok' => false, 'error' => 'Failed to initialize mailer. Please try again later.']);
}

try {
    // Server settings
    if (!extension_loaded('openssl')) {
        error_log('OpenSSL extension is not enabled; TLS/SSL SMTP will fail. Enable php_openssl in php.ini.');
        respond_json(500, ['ok' => false, 'error' => 'Server missing OpenSSL extension. Please enable php_openssl in php.ini and restart Apache.']);
    }
    $mail->isSMTP();
    $mail->CharSet    = 'UTF-8';
    $mail->Host       = $cfg['smtp']['host'] ?? 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $cfg['smtp']['username'] ?? '';
    $mail->Password   = $cfg['smtp']['password'] ?? '';
    $secure           = $cfg['smtp']['secure'] ?? 'tls';
    // Enable SMTP debug output to error_log for diagnostics
    $mail->SMTPDebug  = 2; // 0 = off, 2 = client and server messages
    $mail->Debugoutput = function ($str, $level) {
        error_log("SMTP debug level $level: $str");
    };
    if ($secure === 'ssl') {
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $cfg['smtp']['port'] ?? 465;
    } else {
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $cfg['smtp']['port'] ?? 587;
    }
    
    // Additional Gmail-specific settings
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    $mail->SMTPKeepAlive = true;
    $mail->Timeout = 60;

    // Recipients
    $fromEmail = $cfg['from_email'] ?? 'no-reply@yourdomain.com';
    $fromName  = $cfg['from_name']  ?? 'Portfolio Contact';
    $toEmail   = $cfg['to_email']   ?? 'example@example.com';
    $toName    = $cfg['to_name']    ?? 'Portfolio Owner';

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($toEmail, $toName);
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'Portfolio Contact: ' . $subject;
    $body  = "You received a new message from your portfolio contact form.\n\n";
    $body .= "Name: {$name}\n";
    $body .= "Email: {$email}\n";
    $body .= "Subject: {$subject}\n\n";
    $body .= "Message:\n{$message}\n";
    $mail->Body = $body;

    $sent = $mail->send();
    if ($sent) {
        respond_json(200, ['ok' => true, 'message' => 'Thank you! Your message has been sent.']);
    } else {
        respond_json(500, ['ok' => false, 'error' => 'Unable to send email. Please try again later.']);
    }
} catch (\PHPMailer\PHPMailer\Exception $e) {
    error_log("PHPMailer Exception: " . $e->getMessage());
    $errorMsg = 'Unable to send email. ';
    if (strpos($e->getMessage(), 'Could not connect to SMTP host') !== false) {
        $errorMsg .= 'Please check your internet connection and try again.';
    } elseif (strpos($e->getMessage(), 'Authentication failed') !== false) {
        $errorMsg .= 'Email authentication failed. Please contact the website administrator.';
    } else {
        $errorMsg .= 'Please try again later.';
    }
    respond_json(500, ['ok' => false, 'error' => $errorMsg]);
}
