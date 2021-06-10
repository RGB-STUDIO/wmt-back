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
    return this.database.collection('package').find({}).toArray();
  }

  async find(uid:string): Promise<Collection> {
    return this.database
      .collection('package')
      .findOne({ _id: new ObjectID(uid) });
  }

  async update(schema: PackageDto): Promise<PackageCollection> {
    const packageSnapshot = await this.database.collection('package').findOneAndUpdate({ _id: schema.uid }, {
      $set: {
        title: schema.title,
        price: schema.price,
        description: schema.description,
      },
    }, { returnOriginal: false });
    return packageSnapshot.value;
  }

  async delete(schema: PackageDto): Promise<Collection> {
    const packageSnapshot = await this.database.collection('package').remove({ _id: schema.uid });

    return packageSnapshot.ops[0];
  }
}
