import nodemailer from "nodemailer";

class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const response = await this.transporter.sendMail({
      from: `"Noto" <${process.env.GMAIL_EMAIL}>`,
      to,
      subject,
      html,
    });

    return response;
  }

  async sendMagicLink(to: string, url: string) {
    const html = `
    <p>Click <a href="${url}">here</a> to login</p>
    <p>Or copy and paste the link below in your browser:
    <a href="${url}">${url}</a>
    </p>
    <p>This link will expire in 1 hour.</p>
    `;

    return this.sendEmail(to, "Magic Link", html);
  }
}

export const mailService = new MailService();
