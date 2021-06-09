import { Collection } from 'mongodb'
import { PackageDto } from '../../domain/model/packages/package.dto'
import { PackageCollection } from '../../infraestructura/persistence/packages/types/PackageCollection'

export interface PackageControllerInterface{
    save(schema:PackageDto): Promise<PackageCollection>
    findAll():Promise<Collection[]>
    find(schema:PackageDto):Promise<Collection>
    update(schema:PackageDto):Promise<PackageCollection>
    delete(schema:PackageDto):Promise<Collection>
}