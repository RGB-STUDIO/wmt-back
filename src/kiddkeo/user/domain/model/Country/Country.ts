import { CountryDto } from '@root/kiddkeo/user/domain/model/Country/country.dto';

export class Country {
  uid:number;

  name:string;

  dial_code:string;

  code:string;

  constructor(uid:number,
    name:string,
    dial_code:string,
    code:string) {
    this.uid = uid;
    this.name = name;
    this.dial_code = dial_code;
    this.code = code;
  }

  toDto():CountryDto {
    return {
      uid: this.uid,
      name: this.name,
      dialCode: this.dial_code,
      code: this.code,
    };
  }
}
