import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';

export class Register {
  uid:string;

  name:string;

  lastname:string;

  email:string;

  constructor(id:string,
    name:string,
    lastname:string,
    email:string) {
    this.uid = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
  }

  toJson():RegisterDto {
    return {
      _id: this.uid,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
    };
  }
}
