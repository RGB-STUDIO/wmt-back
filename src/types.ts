const TYPES = {
  MongoConnectionSingleton: Symbol('MongoConnectionSingleton'),
  ProcessEnvironment: Symbol('ProcessEnvironment'),
  EnvService: Symbol('EnvService'),
  MongoClient: Symbol('PgPoolManager'),
  AuthenticationService: Symbol('AuthenticationService'),
  AuthenticationController: Symbol('AuthenticationController'),
  AuthenticationFactory: Symbol('AuthenticationFactory'),
  PersonService: Symbol('PersonService'),
  PersonController: Symbol('PersonController'),
  PersonFactory: Symbol('PersonFactory'),
  PackageService: Symbol('PackageService'),
  PackageController: Symbol('PackageController'),
  PackageFactory: Symbol('PackageFactory')
};

export default TYPES;
