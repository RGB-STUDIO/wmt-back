export enum TypeAddress{
  common = 'common',
  fiscal = 'fiscal',
}

export interface AddressDto {
  id?:number,
  street: string;
  postalCode: string;
  state:string;
  city:string;
  neighborhood?:string;
  headquarters?:string;
  idProvider?: number | null;
  idClient?: number | null;
  type:TypeAddress;
}
