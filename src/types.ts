const TYPES = {
  MongoConnectionSingleton: Symbol('MongoConnectionSingleton'),
  ProcessEnvironment: Symbol('ProcessEnvironment'),
  EnvService: Symbol('EnvService'),
  MongoClient: Symbol('PgPoolManager'),
  RegisterService: Symbol('RegisterService'),
  RegisterController: Symbol('RegisterController'),
  RegisterFactory: Symbol('RegisterFactory'),
};

export default TYPES;
