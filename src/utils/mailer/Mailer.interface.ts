import {Person} from "@root/kiddkeo/user/domain/model/Person/Person";
import {Request, Response} from "express";

export interface MailerInterface{
  testMailer():Promise<void>;
  sendVerificationEmail(person:Person,req:Request,res:Response):Promise<void>;
}
