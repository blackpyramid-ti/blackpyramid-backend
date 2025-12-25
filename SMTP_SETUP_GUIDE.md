# BlackPyramid - Email Integration Setup Guide

This guide explains how to configure the email integration for the BlackPyramid website, enabling the SDR chat agent and contact form to send lead notifications to `contact@blackpyramid.co`.

---

## Overview

The email system is already fully integrated into the website. You just need to provide the SMTP credentials to activate it. Once configured:

- **SDR Chat Agent**: Automatically sends a detailed lead summary with the full conversation history when a visitor provides their email
- **Contact Form**: Sends formatted contact inquiries with all form data

---

## Required Environment Variables

You need to configure the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | Your SMTP server hostname | `smtp.hostinger.com` |
| `SMTP_PORT` | SMTP port (587 for TLS, 465 for SSL) | `587` |
| `SMTP_USER` | Your email address/username | `contact@blackpyramid.co` |
| `SMTP_PASS` | Your email password or app password | `your-password-here` |
| `SMTP_FROM` | (Optional) From address if different from SMTP_USER | `noreply@blackpyramid.co` |
| `LEAD_EMAIL` | (Optional) Email to receive leads, defaults to `contact@blackpyramid.co` | `leads@blackpyramid.co` |

---

## Option 1: Hostinger Email SMTP Configuration

Since you have a Hostinger Cloud Professional plan, you can use Hostinger's email service.

### Step 1: Create an Email Account in Hostinger

1. Log in to your Hostinger account
2. Go to **Emails** → **Email Accounts**
3. Create an email account for `contact@blackpyramid.co` (if not already created)
4. Note down the password you set

### Step 2: Get Hostinger SMTP Settings

Hostinger's SMTP settings are:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=contact@blackpyramid.co
SMTP_PASS=<your-email-password>
```

### Step 3: Configure in Manus

In the Manus Management UI:

1. Click on **Settings** → **Secrets**
2. Add each environment variable:
   - `SMTP_HOST` = `smtp.hostinger.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `contact@blackpyramid.co`
   - `SMTP_PASS` = `<your-email-password>`

---

## Option 2: SendGrid Configuration (Recommended for High Volume)

SendGrid offers better deliverability and analytics for transactional emails.

### Step 1: Create a SendGrid Account

1. Go to [sendgrid.com](https://sendgrid.com) and sign up
2. The free tier allows 100 emails/day

### Step 2: Create an API Key

1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it "BlackPyramid Website"
4. Select **Full Access** or **Restricted Access** with Mail Send permission
5. Copy the API key (you won't see it again)

### Step 3: Verify Your Domain (Recommended)

1. Go to **Settings** → **Sender Authentication**
2. Add and verify `blackpyramid.co` domain
3. This improves deliverability

### Step 4: Configure in Manus

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<your-sendgrid-api-key>
SMTP_FROM=contact@blackpyramid.co
```

---

## Option 3: Gmail/Google Workspace Configuration

If you use Google Workspace for `blackpyramid.co`:

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings
2. Enable 2-Step Verification

### Step 2: Create an App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Name it "BlackPyramid Website"
4. Copy the 16-character password

### Step 3: Configure in Manus

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@blackpyramid.co
SMTP_PASS=<your-app-password>
```

---

## Testing the Configuration

After configuring the SMTP credentials:

1. Open the website
2. Click on the chat widget (bottom right)
3. Go through the conversation flow and provide a test email
4. Check if you receive the lead notification email

Or use the contact form:

1. Navigate to the Contact page
2. Fill out the form with test data
3. Submit and check for the email

---

## Email Templates

The system sends beautifully formatted HTML emails:

### SDR Lead Email Includes:
- Visitor name, email, and company
- Project type and description
- Budget and timeline
- Complete conversation history
- Timestamp and language detected

### Contact Form Email Includes:
- Contact information (name, email, company, phone)
- Selected service and budget range
- Full message content
- Submission timestamp

---

## Troubleshooting

### Emails Not Sending

1. **Check credentials**: Verify SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS are correct
2. **Check firewall**: Some hosting providers block outgoing SMTP. SendGrid usually works better in these cases
3. **Check spam folder**: First emails might land in spam until reputation is established

### Authentication Errors

- For Gmail: Make sure you're using an App Password, not your regular password
- For Hostinger: Ensure the email account exists and the password is correct
- For SendGrid: Use `apikey` as the username (literally the word "apikey")

### Connection Timeouts

- Try port 465 with SSL instead of port 587 with TLS
- Some networks block port 587; SendGrid on port 587 usually works

---

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** through the Manus Secrets panel
3. **Rotate passwords** periodically
4. **Monitor for abuse** - check SendGrid analytics or email logs

---

## Support

If you encounter issues:

1. Check the server logs in the Manus dashboard
2. Verify the email configuration status at `/api/trpc/email.checkStatus`
3. Contact Manus support for platform-specific issues

---

*This guide was created for BlackPyramid by Manus AI.*
