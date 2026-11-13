import nodemailer from 'nodemailer';
import { SETTINGS } from '../../settings/config';

export const nodemailerService = {
  async sendEmail(
    email: string,
    code: string,
    template: (code: string) => string,
  ): Promise<boolean> {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SETTINGS.SMTP.EMAIL,
        pass: SETTINGS.SMTP.EMAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `Blogs Platform <${SETTINGS.SMTP.EMAIL}>`,
      subject: 'Verification code',
      to: email,
      html: template(code),
    });

    return !!info;
  },
};
