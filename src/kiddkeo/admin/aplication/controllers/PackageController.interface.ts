import { Collection } from 'mongodb';
import { PackageDto } from '../../domain/model/packages/package.dto';
import { PackageCollection } from '../../infraestructura/persistence/packages/types/PackageCollection';

export interface PackageControllerInterface{
  save(schema:PackageDto): Promise<PackageCollection>
  findAll():Promise<PackageCollection[]>
  find(uid:string):Promise<PackageCollection>
  update(schema:PackageDto):Promise<PackageCollection>
  delete(uid:string):Promise<PackageCollection>
}
