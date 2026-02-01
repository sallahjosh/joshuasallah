# Gmail SMTP Setup Guide

To enable your contact form to send emails to your Gmail address (sallahdzor@gmail.com), you need to set up Gmail App Passwords.

## Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2-factor authentication

## Step 2: Generate App Password
1. Go back to "Security" settings
2. Under "Signing in to Google", click on "App passwords"
3. Select "Mail" as the app
4. Select "Other (custom name)" as the device
5. Enter "Portfolio Contact Form" as the name
6. Click "Generate"
7. Copy the 16-character password (it will look like: abcd efgh ijkl mnop)

## Step 3: Update Your Configuration
1. Open `mail.config.php` in your project
2. Replace `YOUR_GMAIL_APP_PASSWORD` with the 16-character password you copied
3. Save the file

## Step 4: Test Your Contact Form
1. Open your website: http://localhost/myportfolio/contact.html
2. Fill out the contact form
3. Submit the form
4. Check your Gmail inbox (sallahdzor@gmail.com) for the message

## Troubleshooting
- Make sure XAMPP is running
- Check that your Gmail account has 2-factor authentication enabled
- Verify the app password is correct (no spaces, exactly 16 characters)
- Check the `php_errors.log` file for any error messages

## Security Note
Never commit your `mail.config.php` file to public repositories as it contains your email credentials.
