const TYPES = {
  MongoConnectionSingleton: Symbol('MongoConnectionSingleton'),
  ProcessEnvironment: Symbol('ProcessEnvironment'),
  EnvService: Symbol('EnvService'),
  MongoClient: Symbol('PgPoolManager'),
  RegisterService: Symbol('RegisterService'),
  RegisterController: Symbol('RegisterController'),
  RegisterFactory: Symbol('RegisterFactory'),
  PackageService: Symbol('PackageService'),
  PackageController: Symbol('PackageController'),
  PackageFactory: Symbol('PackageFactory')
};

export default TYPES;
