import { Collection } from 'mongodb';
import { Package } from '../../domain/model/packages/Package';
import { PackageDto } from '../../domain/model/packages/package.dto';

export interface PackageServiceInterface{
  save(schema:PackageDto): Promise<Package>
  findAll():Promise<Collection[]>
  find(uid:string):Promise<Collection>
  update(schema:PackageDto, uid:string): Promise<Package>
  delete(uid:string):Promise<Collection>
}
