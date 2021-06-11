import { Address } from '@root/kiddkeo/user/domain/model/Address/Address';
import { Phone } from '@root/kiddkeo/user/domain/model/Phones/Phone';
import { IdentityDocument } from '@root/kiddkeo/user/domain/model/IdentityDocument/IdentityDocument';

export type PersonSchema = {
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
};
