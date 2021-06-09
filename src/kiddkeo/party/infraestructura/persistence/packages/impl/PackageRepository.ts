import { Collection, Db } from 'mongodb'
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

    async findAll(): Promise<Collection[]>{
        const packageSnapshot = this.database.collection('package').find({})

        while (await packageSnapshot.hasNext()) {
            console.log(await packageSnapshot.next());

            return await packageSnapshot.next();
        }
    }

    async find(schema:PackageDto): Promise<Collection>{

        const packageSnapshot = await this.database.collection('package').findOne({
            _id: schema.uid
        })

        return packageSnapshot
    }

    async update(schema: PackageDto): Promise<PackageCollection>{
        const filter = { _id: schema.uid }

        const packageSnapshot = await this.database.collection('package').replaceOne(filter, schema)

        return packageSnapshot.ops[0]
    }

    async delete(schema: PackageDto): Promise<Collection>{
        const packageSnapshot = await this.database.collection('package').remove({_id: schema.uid})

        return packageSnapshot.ops[0]
    }
}