import { CountryDto } from '@root/kiddkeo/user/domain/model/Country/country.dto';

export interface PhoneDto {
  uid?:number;
  number:string
  country:CountryDto,
}
