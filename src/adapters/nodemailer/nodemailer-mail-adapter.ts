import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e668a3b2b4619b',
    pass: '000516f07fc67a',
  },
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ to, subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to,
      subject,
      html: body,
    });
  }
}
