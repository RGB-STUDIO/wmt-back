import { Phone } from '@root/kiddkeo/user/domain/model/Phones/Phone';
import { Address } from '@root/kiddkeo/user/domain/model/Address/Address';
import { IdentityDocument } from '@root/kiddkeo/user/domain/model/IdentityDocument/IdentityDocument';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import * as crypto from "crypto";
import {Token} from "@root/kiddkeo/user/domain/model/Token/Token";
import {ObjectID} from "mongodb";
import {JWT_KEY_SECRET} from "@root/Constants";
import jwt from 'jsonwebtoken';
import {RegisterDto} from "@root/kiddkeo/user/domain/model/Person/Register.dto";
import {LoginDto} from "@root/kiddkeo/user/domain/model/Person/Login.dto";
const bcrypt = require('bcrypt');

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

  token!:string;

  tokenVerified!:Token;

  twoFa:boolean;

  verified:boolean;

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
    verified:boolean,
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
    this.verified=verified,
    this.twoFa=twoFa;
    this.referralCode=referralCode;
    this.referrer=referrer;
  }

  generateJWT(){
    let payload = {
      id: this.uid,
      email:this.email
    };
    this.token = jwt.sign(payload, JWT_KEY_SECRET,{
      expiresIn: 1440
    });
  }

  async comparePassword(password:string){
    return await bcrypt.compare(password,this.password)
  }


  generatePasswordReset(){
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //1 hora
  }

  generateVerificationToken(){
    this.tokenVerified = new Token(new ObjectID(this.uid),crypto.randomBytes(20).toString('hex'),new Date().toISOString())
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
      verified:this.verified,
      dateOfBirth: this.dateOfBirth,
    };
  }

  toRegisterDto():RegisterDto{
    return {
      uid: this.uid,
      username: this.username,
      firstname: this.firstname,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      referrer: this.referrer ? this.referrer : '',
      referralCode: this.referralCode,
    }
  }

  toLoginDto():LoginDto{
    return {
      uid:this.uid,
      email:this.email,
      token:this.token
    }
  }
}
