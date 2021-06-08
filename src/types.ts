const TYPES = {
  MongoConnectionSingleton: Symbol('MongoConnectionSingleton'),
  ProcessEnvironment: Symbol('ProcessEnvironment'),
  EnvService: Symbol('EnvService'),
  MongoClient: Symbol('PgPoolManager'),
  PersonService: Symbol('PersonService'),
  PersonController: Symbol('PersonController'),
  PersonFactory: Symbol('PersonFactory'),
  RegisterService: Symbol('RegisterService'),
  RegisterController: Symbol('RegisterController'),
  RegisterFactory: Symbol('RegisterFactory'),
};

export default TYPES;
