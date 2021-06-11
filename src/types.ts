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
  PackageService: Symbol('PackageService'),
  PackageController: Symbol('PackageController'),
  PackageFactory: Symbol('PackageFactory')
};

export default TYPES;
