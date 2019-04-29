import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import * as config from 'config';

@Injectable()
export class ConfigService {
  private readonly env: EnvConfig;

  constructor() {
    this.env = (config as any) as EnvConfig;
  }

  get(key: keyof EnvConfig): any {
    return this.env[key];
  }

}
