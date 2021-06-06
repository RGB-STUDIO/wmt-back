import { Phone } from '@root/kiddkeo/user/domain/model/Phones/Phone';
import { Address } from '@root/kiddkeo/user/domain/model/Address/Address';
import { IdentityDocument } from '@root/kiddkeo/user/domain/model/IdentityDocument/IdentityDocument';
import { PersonDto } from '@root/kiddkeo/user/domain/model/Person/Person.dto';

export class Person {
  uid:string;

  firstname:string;

  secondName:string;

  surname:string;

  secondSurname:string;

  email:string;

  password:string;

  username:string;

  address:Address;

  phones:Phone[];

  document:IdentityDocument;

  dateOfBirth:Date;

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
      dateOfBirth: this.dateOfBirth,
    };
  }
}
