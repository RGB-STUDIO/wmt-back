import { inject, injectable } from 'inversify';
import ClientMongo, { MongoClientProviderInterface } from '@database/ClientMongo';
import { RegisterServiceInterface } from '@root/kiddkeo/user/application/Register/Service/RegisterService.interface';
import TYPES from '@root/types';
import { Db } from 'mongodb';
import { RegisterControllerInterface } from '@root/kiddkeo/user/application/Register/Controller/RegisterController.interface';
import { Register } from '@root/kiddkeo/user/domain/model/Register/Register';
import { RegisterDto } from '@root/kiddkeo/user/domain/model/Register/Register.dto';
import { PersonSchema } from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';

@injectable()
export class RegisterService extends ClientMongo implements RegisterServiceInterface {
  private registerController!:RegisterControllerInterface;

  constructor(@inject(TYPES.MongoClient) mongoClient:MongoClientProviderInterface, @inject(TYPES.RegisterFactory)
    private RegisterFactory:(database:Db)=>RegisterControllerInterface) {
    super(mongoClient);
  }

  private async connect() {
    this.clientMongo = await this.connectMongo();
    this.registerController = this.RegisterFactory(this.database);
  }

  async save(schema: RegisterDto): Promise<Register> {
    let registerSnapShot:PersonSchema;
    try {
      await this.connect();
      await this.startSession();
      await this.startTransaction();
      registerSnapShot = await this.registerController.save(schema);
      await this.commitTransaction();
      return new Register(registerSnapShot.uid,
        registerSnapShot.username,
        registerSnapShot.firstname,
        registerSnapShot.surname,
        registerSnapShot.dateOfBirth,
        registerSnapShot.email);
    } catch (err) {
      await this.abortTransaction();
      throw new Error('soy un error :)');
    } finally {
      await this.endSession();
    }
  }
}
