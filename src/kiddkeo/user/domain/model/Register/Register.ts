import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { Phone } from '@root/kiddkeo/user/domain/model/Phones/Phone';

export class Register {
  uid:string;

  username:string;

  firstname:string;

  secondName:string;

  surname:string;

  secondSurname:string;

  dateOfBirth:Date;

  email:string;

  password:string;

  phones:Phone[];

  constructor(uid:string,
    username:string,
    firstname:string,
    secondName:string,
    surname:string,
    secondSurname:string,
    dateOfBirth:Date,
    email:string,
    password:string,
    phones:Phone[]) {
    this.uid = uid;
    this.username = username;
    this.firstname = firstname;
    this.secondName = secondName;
    this.surname = surname;
    this.secondSurname = secondSurname;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.password = password;
    this.phones = phones;
  }

  toJson():RegisterDto {
    return {
      uid: this.uid,
      username: this.username,
      firstname: this.firstname,
      secondName: this.secondName,
      surname: this.surname,
      secondSurname: this.secondSurname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      phones: this.phones.map((phone:Phone) => phone.toDto()),
    };
  }
}
