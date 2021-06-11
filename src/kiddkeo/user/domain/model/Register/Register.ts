import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';

export class Register {
  uid:string;

  username:string;

  firstname:string;

  surname:string;

  dateOfBirth:Date;

  email:string;

  referrer:string;

  referralCode:string;

  constructor(uid:string,
    username:string,
    firstname:string,
    surname:string,
    dateOfBirth:Date,
    email:string,
    referrer:string,
    referralCode:string) {
    this.uid = uid;
    this.username = username;
    this.firstname = firstname;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.referrer = referrer;
    this.referralCode = referralCode;
  }

  toJson():RegisterDto {
    return {
      uid: this.uid,
      username: this.username,
      firstname: this.firstname,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      referrer: this.referrer,
      referralCode: this.referralCode,
    };
  }
}
