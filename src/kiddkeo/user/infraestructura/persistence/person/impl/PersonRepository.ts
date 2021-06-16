import {Db, ObjectID} from 'mongodb';
import {PersonRepositoryInterface} from '@root/kiddkeo/user/infraestructura/persistence/person/PersonRepository.interface';
import {RegisterDto} from '@root/kiddkeo/user/domain/model/Person/Register.dto';
import {PersonSchema} from '@root/kiddkeo/user/infraestructura/persistence/person/types/PersonSchema';
import {PersonDto} from '@root/kiddkeo/user/domain/model/Person/Person.dto';
import {DeepPartial} from '@utils/types/deeppartial';
import {COLLECTIONS} from '@root/Constants';
import {shiftIterator} from "superstruct/lib/utils";

export class PersonRepository implements PersonRepositoryInterface {
  private database:Db;

  constructor(database:Db) {
    this.database = database;
  }

  async findByEmail(email:string):Promise<PersonSchema>{
      return await this.database.collection(COLLECTIONS.PERSON).findOne({email: email});
  }

  async findByUsername(username:string):Promise<Boolean>{
      const personSnapshot=await this.database.collection(COLLECTIONS.PERSON).findOne({username:username});
      return personSnapshot !== null
  }

  async findReferrerCode(code:string):Promise<PersonSchema> {
    return this.database.collection(COLLECTIONS.PERSON).findOne({ referralCode: code });
  }

 async find(uid:string):Promise<PersonSchema>{
    const personSnapshot=await this.database.collection(COLLECTIONS.PERSON).findOne({_id:new ObjectID(uid)})
    return personSnapshot.ops[0];
  }

  async save(schema: RegisterDto): Promise<PersonSchema> {
    const registerSnapshot = await this.database.collection(COLLECTIONS.PERSON).insertOne({...schema, active:false, verified:false, twoFa:false});
    return registerSnapshot.ops[0];
  }

  async update(schema: DeepPartial<PersonDto>): Promise<PersonSchema> {
      await this.database.collection(COLLECTIONS.PERSON).updateOne({_id:schema.uid},{
          $set:{
              firstname:schema.firstname,
              secondName:schema.secondName,
              surname:schema.surname,
              secondSurname:schema.secondSurname,
              username:schema.username,
              email:schema.email,
              dateOfBirth:schema.dateOfBirth,
              verified:schema.verified,
              active:schema.active,
              resetPasswordToken:schema.resetPasswordToken,
              resetPasswordExpires:schema.resetPasswordExpires,
              twoFa:schema.twoFa,
              gAuth:schema.gAuth,
              gAuthSecret:schema.gAuthSecret,
              document:{
                  documentType:schema.document?.documentType,
                  document:schema.document?.document
              }

          }
      })
    return {} as PersonSchema;
  }

  async softDelete(uid:string):Promise<PersonSchema>{
      await this.database.collection(COLLECTIONS.PERSON).updateOne({_id:new ObjectID(uid)},{active:false});
      return this.find(uid);
  }

  async delete(uid:string):Promise<PersonSchema>{
      const personSnapshot = await this.find(uid)
      await this.database.collection(COLLECTIONS.PERSON).deleteOne({_id:new ObjectID(uid)})
      return personSnapshot;
  }
}
