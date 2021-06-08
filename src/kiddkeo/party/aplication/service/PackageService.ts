import { inject, injectable } from 'inversify';
import ClientMongo, { MongoClientProviderInterface } from '@database/ClientMongo';
import TYPES from '@root/types';
import { Db } from 'mongodb';
import { PackageControllerInterface } from '../controllers/PackageController.interface';
import { Package } from '../../domain/model/packages/Package';
import { PackageDto } from '../../domain/model/packages/package.dto';

@injectable()
export class PackageService extends ClientMongo implements PackageServiceInterface {
  private packageController: PackageControllerInterface;

  constructor(@inject(TYPES.MongoClient) mongoClient: MongoClientProviderInterface, @inject(TYPES.PackageFactory)
  private packageRepository: (database: Db) => PackageControllerInterface) {
    super(mongoClient);
  }

  private async Connect() {
    this.clientMongo = await this.connectMongo();
    this.packageController = this.packageRepository(this.database);
  }

  /*     private async loadReferences(snapShot: unknown): Promise<Package> {

    } */

  async save(schema: PackageDto): Promise<Package> {
    let packageSnapShot: unknown

    try {
      await this.Connect();
      await this.startSession();
      await this.startTransaction();
      packageSnapShot = await this.packageController.save(schema);
      await this.commitTransaction();
    } catch (err) {
      await this.abortTransaction();
      throw new Error('Ha ocurrido un error');
    } finally {
      await this.endSession();
    }
  }
}
