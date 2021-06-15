import { PackageDto } from './package.dto';

export class Package {
  uid:string;

  title: string;

  price: number;

  description?: string;

  activate: boolean;
  
  position: number;

  constructor(uid:string, title:string, price: number, description:string, activate: boolean, position: number) {
    this.uid = uid;
    this.title = title;
    this.price = price;
    this.description = description;
    this.activate = activate;
    this.position = position
  }

  toJson():PackageDto {
    return {
      uid: this.uid,
      title: this.title,
      price: this.price,
      description: this.description,
      activate: this.activate,
      position: this.position
    };
  }
}
