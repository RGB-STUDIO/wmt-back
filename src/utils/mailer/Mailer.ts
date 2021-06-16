import nodeMailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'inversify';
import TYPES from '@root/types';
import {MailerInterface} from "@utils/mailer/Mailer.interface";
import {IEnvService} from "@utils/env";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {Person} from "@root/kiddkeo/user/domain/model/Person/Person";
import {Request, Response} from 'express';

@injectable()
export class MailerSingleton implements MailerInterface {
  transport:Transporter<SMTPTransport.SentMessageInfo> ;

  constructor(@inject(TYPES.EnvService) private envService: IEnvService) {
    const opts:SMTPTransport.Options = {
      host: this.envService.get('MAILER_HOST'),
      port: Number(this.envService.get('MAILER_PORT')),
      secure: false,
      auth: {
        user: this.envService.get('MAILER_USER'),
        pass: this.envService.get('MAILER_PWD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    this.transport = nodeMailer.createTransport(opts);
  }

  async testMailer():Promise<void> {
    await this.transport.sendMail({
      from: '"Fred Foo 👻" <thaymerapv@gmail.com>', // sender address
      to: 'thaymeralbertoportillo@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
  }

  async sendVerificationEmail(person:Person,req:Request,res:Response):Promise<void>{
    const subject = "Email verification of your account";
    const to=person.email;
    const from= this.envService.get('MAILER_USER')
    let link = `https://www.crashbandicoot.com/`; //TODO terminate link verification
    let html = `<p>Hello ${person.firstname}<p><br><p>Please click on the following link <a href="${link}">link</a> to verify your account.</p> 
              <br><p>If you did not request this, please ignore this email.</p>`;
    await this.transport.sendMail({ to, from, subject, html })
    res.status(200).json({
      ok: true,
      message: `A verification email has been sent to ${person.email}.`,
      user: person.toRegisterDto(),
    });
  }

}
