import { Package } from '../../domain/model/packages/Package';
import { PackageDto } from '../../domain/model/packages/package.dto';

export interface PackageServiceInterface{
  save(schema:PackageDto): Promise<Package>
  findAll():Promise<Package[]>
  find(uid:string):Promise<Package>
  update(schema:PackageDto): Promise<Package>
  delete(uid:string):Promise<Package>
}
