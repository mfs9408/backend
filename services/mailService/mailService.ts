const nodemailer = require("nodemailer");
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import { Transporter } from "nodemailer";

class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Activation of your account on " + process.env.API_URL,
      text: "",
      html: `<div>
<h1>Follow the link for activation</h1>
<a href='${link}'>${link}</a>
</div>`,
    });
  }
}

export default new MailService();
