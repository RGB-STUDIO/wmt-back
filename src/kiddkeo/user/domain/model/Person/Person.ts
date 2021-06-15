import { Phone } from '@root/kiddkeo/user/domain/model/Phones/Phone';
import { Address } from '@root/kiddkeo/user/domain/model/Address/Address';
import { IdentityDocument } from '@root/kiddkeo/user/domain/model/IdentityDocument/IdentityDocument';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import * as crypto from "crypto";
import {Token} from "@root/kiddkeo/user/domain/model/Token/Token";

export class Person {
  uid:string;

  firstname:string;

  secondName:string;

  surname:string;

  secondSurname:string;

  email:string;

  password:string;

  username:string;

  active:boolean;

  referralCode?:string;

  referrer?:string;

  address:Address;

  phones:Phone[];

  document:IdentityDocument;

  dateOfBirth:Date;

  resetPasswordToken:string | undefined;

  resetPasswordExpires:number | undefined;

  twoFa:boolean;

  gAuth:boolean | undefined;

  gAuthSecret:boolean | undefined;

  constructor(
    uid:string,
    firstname:string,
    secondName:string,
    surname:string,
    secondSurname:string,
    email:string,
    password:string,
    username:string,
    address:Address,
    phones:Phone[],
    document:IdentityDocument,
    dateOfBirth:Date,
    active:boolean,
    twoFa:boolean,
    referralCode:string,
    referrer:string
  ) {
    this.uid = uid;
    this.firstname = firstname;
    this.secondName = secondSurname;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.email = email;
    this.password = password;
    this.username = username;
    this.address = address;
    this.phones = phones;
    this.document = document;
    this.dateOfBirth = dateOfBirth;
    this.active=active;
    this.twoFa=twoFa;
    this.referralCode=referralCode;
    this.referrer=referrer;
  }

  generatePasswordReset(){
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //1 hora
  }

  generateVerificationToken(){
    return new Token(this.uid,crypto.randomBytes(20).toString('hex'),new Date())
  }

  toJson():PersonDto {
    return {
      uid: this.uid,
      firstname: this.firstname,
      secondName: this.secondName,
      surname: this.surname,
      secondSurname: this.secondSurname,
      email: this.email,
      username: this.username,
      address: this.address.toDto(),
      phones: this.phones.map((phone:Phone) => phone.toDto()),
      document: this.document.toDto(),
      active:this.active,
      twoFa:this.twoFa,
      referralCode:this.referralCode,
      referrer:this.referrer,
      dateOfBirth: this.dateOfBirth,
    };
  }
}
