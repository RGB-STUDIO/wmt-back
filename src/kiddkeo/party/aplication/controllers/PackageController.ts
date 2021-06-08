import { PackageControllerInterface } from './PackageController.interface'
import { Db } from 'mongodb';
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
}

