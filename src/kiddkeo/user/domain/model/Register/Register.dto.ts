import { PhoneDto } from '@root/kiddkeo/user/domain/model/Phones/phone.dto';

export interface RegisterDto{
  uid:string,
  username:string,
  firstname:string,
  secondName:string,
  surname:string,
  secondSurname:string,
  password?:string,
  email:string,
  dateOfBirth:Date,
  phones:PhoneDto[]
}
