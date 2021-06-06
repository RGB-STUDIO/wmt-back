import { PhoneDto } from '@root/kiddkeo/user/domain/model/Phones/phone.dto';
import { Country } from '@root/kiddkeo/user/domain/model/Country/Country';

export class Phone {
  uid: number;

  number: string;

  country: Country;

  constructor(
    uid:number,
    number: string,
    country:Country,
  ) {
    this.uid = uid;
    this.number = number;
    this.country = country;
  }

  toDto(): PhoneDto {
    return {
      uid: this.uid,
      number: this.number,
      country: this.country.toDto(),
    };
  }
}
