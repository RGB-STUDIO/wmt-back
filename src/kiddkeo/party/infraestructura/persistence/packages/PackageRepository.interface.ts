import { DeleteWriteOpResultObject, UpdateWriteOpResult } from 'mongodb';
import { PackageDto } from '../../../domain/model/packages/package.dto';
import { PackageCollection } from './types/PackageCollection';

export interface PackageRepositoryInterface {
  save(schema:PackageDto): Promise<PackageCollection>
  findAll():Promise<PackageCollection[]>
  find(uid:string):Promise<PackageCollection>
  update(schema:PackageDto):Promise<UpdateWriteOpResult>
  delete(uid:string):Promise<DeleteWriteOpResultObject>
}
