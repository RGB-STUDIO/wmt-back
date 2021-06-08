import { Db } from 'mongodb'
import { PackageRepositoryInterface } from '../PackageRepository.interface'
import { PackageDto } from '../../../../domain/model/packages/package.dto'
import { PackageCollection } from '../types/PackageCollection'

export class PackageRepository implements PackageRepositoryInterface {
    private database: Db

    constructor(database:Db){
        this.database = database
    }

    async save(schema:PackageDto): Promise<PackageCollection>{
        const packageSnapshot = await this.database.collection('packgae').insertOne(schema)
        return packageSnapshot.ops[0]
    }
}