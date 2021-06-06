import { AddressDto, TypeAddress } from '@root/kiddkeo/user/domain/model/Address/address.dto';

export class Address {
  id:number;

  street: string;

  postalCode: string;

  state:string;

  city:string;

  neighborhood:string;

  headquarters:string;

  type:TypeAddress;

  constructor(
    id:number,
    street: string,
    postalCode: string,
    state:string,
    city:string,
    neighborhood:string,
    headquarters:string,
    type:TypeAddress,
  ) {
    this.id = id;
    this.street = street;
    this.postalCode = postalCode;
    this.state = state;
    this.city = city;
    this.neighborhood = neighborhood;
    this.headquarters = headquarters;
    this.type = type;
  }

  toDto():AddressDto {
    return {
      id: this.id,
      street: this.street,
      postalCode: this.postalCode,
      state: this.state,
      city: this.city,
      neighborhood: this.neighborhood,
      headquarters: this.headquarters,
      type: this.type,
    };
  }
}
