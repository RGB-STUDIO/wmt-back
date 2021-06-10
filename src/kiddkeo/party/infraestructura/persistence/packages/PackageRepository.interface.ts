import { Collection } from 'mongodb';
import { PackageDto } from '../../../domain/model/packages/package.dto';
import { PackageCollection } from './types/PackageCollection';

export interface PackageRepositoryInterface {
  save(schema:PackageDto): Promise<PackageCollection>
  findAll():Promise<Collection[]>
  find(uid:string):Promise<Collection>
  update(schema:PackageDto):Promise<PackageCollection>
  delete(uid:string):Promise<Collection>
}
