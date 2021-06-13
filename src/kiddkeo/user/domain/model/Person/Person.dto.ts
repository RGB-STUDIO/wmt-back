import { PhoneDto } from '@root/kiddkeo/user/domain/model/Phones/phone.dto';
import { AddressDto } from '@root/kiddkeo/user/domain/model/Address/address.dto';
import { IdentityDocumentDto } from '@root/kiddkeo/user/domain/model/IdentityDocument/identityDocument.dto';

export interface PersonDto {
  uid?:string;

  firstname:string;

  secondName?:string;

  surname:string;

  secondSurname?:string;

  email:string;

  username:string;

  password?:string;

  address?:AddressDto;

  phones?:PhoneDto[];

  document?:IdentityDocumentDto;

  referralCode?:string,

  referrer?:string;

  active:boolean;

  dateOfBirth:Date;
}
