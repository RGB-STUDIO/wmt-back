import { Collection } from 'mongodb'
import { Package } from '../../domain/model/packages/Package'
import { PackageDto } from '../../domain/model/packages/package.dto'

export interface PackageServiceInterface{
    save(schema:PackageDto): Promise<Package>
    findAll():Promise<Collection[]>
    find(schema:PackageDto):Promise<Collection>
    update(schema:PackageDto): Promise<Package>    
    delete(schema:PackageDto):Promise<Collection>
}