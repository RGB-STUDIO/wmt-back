import {
  Collection, Db, ObjectID,
} from 'mongodb';
import { PackageRepositoryInterface } from '../PackageRepository.interface';
import { PackageDto } from '../../../../domain/model/packages/package.dto';
import { PackageCollection } from '../types/PackageCollection';

export class PackageRepository implements PackageRepositoryInterface {
  private database: Db;

  constructor(database:Db) {
    this.database = database;
  }

  async save(schema:PackageDto): Promise<PackageCollection> {
    const packageSnapshot = await this.database.collection('package').insertOne(schema);
    return packageSnapshot.ops[0];
  }

  async findAll(): Promise<Collection[]> {
    return (await this.database.collection('package').find({}).sort({title: 1}).toArray());
  }

  async find(uid:string): Promise<Collection> {
    return this.database
      .collection('package')
      .findOne({ _id: new ObjectID(uid) });
  }

  async update(schema: PackageDto): Promise<PackageCollection> {
    const packageSnapshot = await this.database.collection('package').updateOne({ _id: new ObjectID(schema.uid) }, {
      $set: {
        title: schema.title,
        price: schema.price,
        description: schema.description,
      }
    })

    return packageSnapshot.connection
  }

  async delete(uid: string): Promise<Collection> {
    const packageSnapshot = await this.database.collection('package').deleteOne({ _id: new ObjectID(uid) });

    return packageSnapshot.connection;
  }
}
