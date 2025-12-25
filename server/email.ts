import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Email message interface
interface EmailMessage {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

// SDR Lead data interface
export interface SDRLeadData {
  visitorName: string;
  visitorEmail: string;
  visitorCompany?: string;
  projectType: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  conversationHistory: Array<{
    role: "assistant" | "user";
    content: string;
  }>;
  language: string;
  timestamp: Date;
}

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: Date;
}

// Get email configuration from environment variables
function getEmailConfig(): EmailConfig | null {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("[Email] SMTP configuration incomplete. Email sending disabled.");
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

// Create transporter singleton
let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;

  const config = getEmailConfig();
  if (!config) return null;

  transporter = nodemailer.createTransport(config);
  return transporter;
}

// Send email function
async function sendEmail(message: EmailMessage): Promise<boolean> {
  const transport = getTransporter();
  
  if (!transport) {
    console.warn("[Email] Cannot send email: transporter not configured");
    return false;
  }

  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
  
  try {
    await transport.sendMail({
      from: `"BlackPyramid" <${fromEmail}>`,
      ...message,
    });
    console.log(`[Email] Successfully sent to ${message.to}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

// Format SDR lead email
export async function sendSDRLeadEmail(data: SDRLeadData): Promise<boolean> {
  const targetEmail = process.env.LEAD_EMAIL || "contact@blackpyramid.co";
  
  // Format conversation history
  const conversationText = data.conversationHistory
    .map((msg) => `${msg.role === "assistant" ? "SDR Agent" : "Visitor"}: ${msg.content}`)
    .join("\n\n");

  // Create HTML version
  const conversationHtml = data.conversationHistory
    .map(
      (msg) =>
        `<p><strong>${msg.role === "assistant" ? "SDR Agent" : "Visitor"}:</strong> ${msg.content}</p>`
    )
    .join("");

  const subject = `🔥 New Lead: ${data.visitorName} - ${data.projectType}`;

  const textContent = `
NEW LEAD FROM BLACKPYRAMID WEBSITE
==================================

VISITOR INFORMATION
-------------------
Name: ${data.visitorName}
Email: ${data.visitorEmail}
Company: ${data.visitorCompany || "Not provided"}
Language: ${data.language}
Timestamp: ${data.timestamp.toISOString()}

PROJECT DETAILS
---------------
Type: ${data.projectType}
Description: ${data.projectDescription}
Budget: ${data.budget || "Not specified"}
Timeline: ${data.timeline || "Not specified"}

CONVERSATION HISTORY
--------------------
${conversationText}

---
This lead was captured by the BlackPyramid SDR Agent.
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D4AF37, #B8860B); color: #000; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .section h2 { color: #B8860B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 120px; color: #666; }
    .info-value { flex: 1; }
    .conversation { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
    .conversation p { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔥 New Lead Captured</h1>
    </div>
    
    <div class="section">
      <h2>Visitor Information</h2>
      <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${data.visitorName}</span></div>
      <div class="info-row"><span class="info-label">Email:</span><span class="info-value"><a href="mailto:${data.visitorEmail}">${data.visitorEmail}</a></span></div>
      <div class="info-row"><span class="info-label">Company:</span><span class="info-value">${data.visitorCompany || "Not provided"}</span></div>
      <div class="info-row"><span class="info-label">Language:</span><span class="info-value">${data.language}</span></div>
      <div class="info-row"><span class="info-label">Timestamp:</span><span class="info-value">${data.timestamp.toLocaleString()}</span></div>
    </div>
    
    <div class="section">
      <h2>Project Details</h2>
      <div class="info-row"><span class="info-label">Type:</span><span class="info-value">${data.projectType}</span></div>
      <div class="info-row"><span class="info-label">Description:</span><span class="info-value">${data.projectDescription}</span></div>
      <div class="info-row"><span class="info-label">Budget:</span><span class="info-value">${data.budget || "Not specified"}</span></div>
      <div class="info-row"><span class="info-label">Timeline:</span><span class="info-value">${data.timeline || "Not specified"}</span></div>
    </div>
    
    <div class="section">
      <h2>Conversation History</h2>
      <div class="conversation">
        ${conversationHtml}
      </div>
    </div>
    
    <div class="footer">
      <p>This lead was captured by the BlackPyramid SDR Agent</p>
      <p>© ${new Date().getFullYear()} BlackPyramid. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({
    to: targetEmail,
    subject,
    text: textContent,
    html: htmlContent,
    replyTo: data.visitorEmail,
  });
}

// Format contact form email
export async function sendContactFormEmail(data: ContactFormData): Promise<boolean> {
  const targetEmail = process.env.LEAD_EMAIL || "contact@blackpyramid.co";

  const subject = `📬 Contact Form: ${data.subject}`;

  const textContent = `
NEW CONTACT FORM SUBMISSION
===========================

FROM
----
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Phone: ${data.phone || "Not provided"}

SUBJECT
-------
${data.subject}

MESSAGE
-------
${data.message}

---
Submitted at: ${data.timestamp.toISOString()}
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #D4AF37, #B8860B); color: #000; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .section h2 { color: #B8860B; margin-top: 0; font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; }
    .info-row { display: flex; margin-bottom: 10px; }
    .info-label { font-weight: bold; width: 100px; color: #666; }
    .info-value { flex: 1; }
    .message-box { background: #fff; border: 1px solid #ddd; padding: 20px; border-radius: 8px; white-space: pre-wrap; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
    </div>
    
    <div class="section">
      <h2>Contact Information</h2>
      <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${data.name}</span></div>
      <div class="info-row"><span class="info-label">Email:</span><span class="info-value"><a href="mailto:${data.email}">${data.email}</a></span></div>
      <div class="info-row"><span class="info-label">Company:</span><span class="info-value">${data.company || "Not provided"}</span></div>
      <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${data.phone || "Not provided"}</span></div>
    </div>
    
    <div class="section">
      <h2>Subject: ${data.subject}</h2>
      <div class="message-box">${data.message}</div>
    </div>
    
    <div class="footer">
      <p>Submitted at: ${data.timestamp.toLocaleString()}</p>
      <p>© ${new Date().getFullYear()} BlackPyramid. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

  return sendEmail({
    to: targetEmail,
    subject,
    text: textContent,
    html: htmlContent,
    replyTo: data.email,
  });
}

// Verify SMTP connection
export async function verifyEmailConnection(): Promise<boolean> {
  const transport = getTransporter();
  
  if (!transport) {
    return false;
  }

  try {
    await transport.verify();
    console.log("[Email] SMTP connection verified successfully");
    return true;
  } catch (error) {
    console.error("[Email] SMTP connection verification failed:", error);
    return false;
  }
}
