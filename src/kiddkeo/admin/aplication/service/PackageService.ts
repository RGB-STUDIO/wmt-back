import { inject, injectable } from 'inversify';
import ClientMongo, { MongoClientProviderInterface } from '@database/ClientMongo';
import TYPES from '@root/types';
import { Db } from 'mongodb';
import { PackageCollection } from '@root/kiddkeo/admin/infraestructura/persistence/packages/types/PackageCollection';
import { PackageControllerInterface } from '../controllers/PackageController.interface';
import { Package } from '../../domain/model/packages/Package';
import { PackageDto } from '../../domain/model/packages/package.dto';
import { PackageServiceInterface } from './PackageService.interface';

@injectable()
export class PackageService extends ClientMongo implements PackageServiceInterface {
  private packageController!: PackageControllerInterface;

  constructor(@inject(TYPES.MongoClient) mongoClient: MongoClientProviderInterface,
    @inject(TYPES.PackageFactory)
    private packageRepository: (database: Db) => PackageControllerInterface) {
    super(mongoClient);
  }

  private async Connect() {
    this.clientMongo = await this.connectMongo();
    this.packageController = this.packageRepository(this.database);
  }

  /*   private async loadReferences(snapShot: any): Promise<Package> {
    return new Package(snapShot.uuid, snapShot.title, snapShot.number, snapShot.description)
  }
 */

  async save(schema: PackageDto): Promise<Package> {
    let packageSnapShot: any;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.save(schema);
      await this.commitTransaction();
      // eslint-disable-next-line no-underscore-dangle
      return new Package(packageSnapShot._id,
        packageSnapShot.title,
        packageSnapShot.price,
        packageSnapShot.description,
        packageSnapShot.activate,
        packageSnapShot.position);
    } catch (err) {
      await this.abortTransaction();
      throw err
    } finally {
      await this.endSession();
    }
  }

  async findAll(): Promise<Package[]> {
    let packageSnapShot: PackageCollection[];
    try {
      await this.Connect();
      await this.startSession();
      packageSnapShot = await this.packageController.findAll();
      // eslint-disable-next-line no-underscore-dangle
      return packageSnapShot.map((elem:PackageCollection) => new Package(elem._id,
        elem.title,
        elem.price,
        elem.description,
        elem.activate,
        elem.position));
    } catch (err) {
      throw err
    } finally {
      await this.endSession();
    }
  }

  async find(uid:string): Promise<Package> {
    let packageSnapShot: PackageCollection;

    try {
      await this.Connect();
      await this.startSession();
      packageSnapShot = await this.packageController.find(uid);
      // eslint-disable-next-line no-underscore-dangle
      return new Package(packageSnapShot._id,
        packageSnapShot.title,
        packageSnapShot.price,
        packageSnapShot.description,
        packageSnapShot.activate,
        packageSnapShot.position);
    } catch (err) {
      throw err
    } finally {
      await this.endSession();
    }
  }

  async update(schema: PackageDto): Promise<Package> {
    let packageSnapShot: PackageCollection;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.update(schema);
      await this.commitTransaction();
      // eslint-disable-next-line no-underscore-dangle
      return new Package(packageSnapShot._id,
        packageSnapShot.title,
        packageSnapShot.price,
        packageSnapShot.description,
        packageSnapShot.activate,
        packageSnapShot.position);
    } catch (err) {
      await this.abortTransaction();
      throw err
    } finally {
      await this.endSession();
    }
  }

  async delete(uid:string): Promise<Package> {
    let packageSnapShot: PackageCollection;

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.delete(uid);
      await this.commitTransaction();
      // eslint-disable-next-line no-underscore-dangle
      return new Package(packageSnapShot._id,
        packageSnapShot.title,
        packageSnapShot.price,
        packageSnapShot.description,
        packageSnapShot.activate,
        packageSnapShot.position);
    } catch (err) {
      await this.abortTransaction();
      throw err
    } finally {
      await this.endSession();
    }
  }
}
