import ClientMongo, { MongoClientProviderInterface } from '@database/ClientMongo';
import { Collection } from 'mongodb';
import TYPES from '@root/types';
import { inject } from 'inversify';
import { COLLECTIONS } from '../../Contants';

export class Schema extends ClientMongo {
  private collections!:Collection[];

  private acc:number = 0;

  constructor(@inject(TYPES.MongoClient) mongoClient:MongoClientProviderInterface) {
    super(mongoClient);
  }

  private async connect() {
    await this.connectMongo();
    const collections = await this.database.command({
      listCollections: 1.0,
      authorizedCollections: true,
      nameOnly: true,
    });
    this.collections = collections.cursor.firstBatch as Collection[];
  }

  private async createCollectionPerson():Promise<Collection<any> | Boolean> {
    if (this.collections.find(
      (collection:any) => collection.name === COLLECTIONS.PERSON,
    ) === undefined) {
      const collection = this.database.createCollection(COLLECTIONS.PERSON, {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['firstname',
              'surname',
              'username',
              'password',
              'email',
              'dateOfBirth',
              'referralCode',
              'active',
              'verified',
              'twoFa'
            ],
            properties: {
              _id: {
                bsonType: 'objectId',
              },
              firstname: {
                bsonType: 'string',
                description: 'firstname is required',
              },
              secondName: {
                bsonType: 'string',
              },
              surname: {
                bsonType: 'string',
                description: 'surname is required',
              },
              secondSurname: {
                bsonType: 'string',
              },
              username: {
                bsonType: 'string',
                description: 'username is required',
              },
              password: {
                bsonType: 'string',
                description: 'password is required',
              },
              email: {
                bsonType: 'string',
                description: 'email is required',
              },
              dateOfBirth: {
                bsonType: 'date',
                description: 'dateOfBirth is required',
              },
              referralCode: {
                bsonType: 'string',
                description: 'referralCode is required',
              },
              referrer: {
                bsonType: 'string',
                description: 'referrer is required',
              },
              verified:{
                bsonType: 'bool'
              },
              active:{
                bsonType: 'bool'
              },
              resetPasswordToken:{
                  bsonType:'string'
              },
              resetPasswordExpires:{
                bsonType:'string'
              },
              twoFa:{
                bsonType:'bool'
              },
              gAuth:{
                bsonType:'string'
              },
              gAuthSecret:{
                bsonType:'string'
              },
              document: {
                bsonType: 'object',
                required: ['documentType', 'document'],
                properties: {
                  documentType: {
                    bsonType: 'string',
                    description: 'documentType is required',
                  },
                  document: {
                    bsonType: 'string',
                    description: 'document is required',
                  },
                },
              },
              address: {
                bsonType: 'object',
                required: ['street', 'postalCode', 'state', 'city'],
                properties: {
                  street: {
                    bsonType: 'string',
                    description: 'street is required',
                  },
                  postalCode: {
                    bsonType: 'string',
                    description: 'postalCode is required',
                  },
                  state: {
                    bsonType: 'string',
                    description: 'state is required',
                  },
                  city: {
                    bsonType: 'string',
                    description: 'city is required',
                  },
                  country: {
                    bsonType: 'string',
                    description: 'name country is required',
                  },
                },
              },
              phones: {
                bsonType: 'array',
                items: {
                  bsonType: 'object',
                  required: ['number', 'dial_code', 'code'],
                  description: "'items' must contain the stated fields.",
                  properties: {
                    _id: {
                      bsonType: 'objectId',
                    },
                    number: {
                      bsonType: 'string',
                      description: 'number is required',
                    },
                    dial_code: {
                      bsonType: 'string',
                      description: 'dial_code is required',
                    },
                    code: {
                      bsonType: 'string',
                      description: 'code is required',
                    },
                  },
                },
              },
            }
          },
        },
      });
      await this.database.collection(COLLECTIONS.PERSON).createIndex('email',{unique:true})
      await this.database.collection(COLLECTIONS.PERSON).createIndex('username',{unique:true})
      this.acc += 1;
      return collection;
    }
    return true;
  }

  private async createCollectionToken():Promise<Collection<any> | Boolean>{
    if (this.collections.find(
        (collection:any) => collection.name === COLLECTIONS.TOKEN,
    ) === undefined){
      const collection = this.database.createCollection(COLLECTIONS.TOKEN,{
        validator:{
          $jsonSchema: {
            bsonType: 'object',
            required:['user_id','token','create_at'],
            properties:{
              _id: {
                bsonType: 'objectId',
              },
              user_id:{
                bsonType:'objectId',
                description:'user_id is required'
              },
              token:{
                bsonType:'string',
                description:'token is required'
              },
              create_at:{
                bsonType:'date'
              }
            }
          }
        }
      })
      // await this.database.collection(COLLECTIONS.TOKEN).createIndex('user_id',{unique:true})
      await this.database.collection(COLLECTIONS.TOKEN).createIndex('create_at',{expireAfterSeconds:43200});
      this.acc += 1;
      return collection;
    }
    return true;
  }

  private async createCollectionPackage():Promise<Collection<any> | Boolean> {
    if (this.collections.find(
      (collection:any) => collection.name === COLLECTIONS.PACKAGE,
    ) === undefined) {
      const collection = this.database.createCollection(COLLECTIONS.PACKAGE, {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['title', 'price', 'activate', 'position'],
            properties: {
              _id: {
                bsonType: 'objectId',
              },
              title: {
                bsonType: 'string',
                description: 'title is required',
              },
              price: {
                bsonType: 'number',
                description: 'price is required',
              },
              description: {
                bsonType: 'string',
              },
              activate: {
                bsonType: 'bool',
                description: 'activate is required'
              },
              position: {
                bsonType: 'number',
                description: 'position is required'
              }
            },
          },
        },
      });
      this.acc += 1;
      return collection;
    }
    return true;
  }

  async createModels():Promise<object> {
    try {
      await this.connect();
      await this.createCollectionPerson();
      await this.createCollectionToken();
      await this.createCollectionPackage();
    } catch (err) {
      throw new Error(err);
    }
    return { numbers: this.acc };
  }
}
