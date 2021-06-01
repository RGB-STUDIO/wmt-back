import { assert } from 'superstruct';
import { injectable, inject } from 'inversify';
import TYPES from '../types';

export interface Environment {
  [index: string]: string | undefined;
  [index: number]: string | undefined;

}

export interface IEnvService {
  validate(schema: any): any;

  get(variable: string): string | undefined;
}

@injectable()
class EnvService implements IEnvService {
  constructor(@inject(TYPES.ProcessEnvironment) private environment: Environment) {
  }

  validate(schema: any) {
    assert(this.environment, schema);
  }

  get(variable: string): string | undefined {
    return this.environment[variable];
  }
}

export default EnvService;
