import { PackageControllerInterface } from './PackageController.interface'
import { Collection, Db } from 'mongodb';
import { PackageRepositoryInterface } from '../../infraestructura/persistence/packages/PackageRepository.interface'
import { PackageRepository } from '../../infraestructura/persistence/packages/impl/PackageRepository'
import { PackageDto } from '../../domain/model/packages/package.dto'
import { PackageCollection } from '../../infraestructura/persistence/packages/types/PackageCollection'

export class PackageController implements PackageControllerInterface {
    private packageRepository: PackageRepositoryInterface

    constructor(database: Db){
        this.packageRepository = new PackageRepository(database)
    }

    async save(schema: PackageDto): Promise<PackageCollection>{
        return this.packageRepository.save(schema)
    }

    async findAll(): Promise<Collection[]>{
        return this.packageRepository.findAll()
    }

    async find(schema:PackageDto):Promise<Collection>{
        return this.packageRepository.find(schema)
    }

    async update(schema:PackageDto):Promise<PackageCollection>{
        return this.packageRepository.update(schema)
    }

    async delete(schema:PackageDto):Promise<Collection>{
        return this.packageRepository.delete(schema)
    }
}
