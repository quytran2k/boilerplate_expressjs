import dotenv from 'dotenv';
import environments from '../../constants/environments.constant';

dotenv.config();

export interface EnvData {
  // database
  DB_TYPE: 'mysql';
  DB_HOST?: string;
  DB_NAME: string;
  DB_PORT?: number;
  DB_USER: string;
  DB_PASSWORD: string;

  // application
  NODE_ENV?: string;
}

export class EnvService {
  static instance: EnvService;
  private vars: EnvData = {
    DB_TYPE: 'mysql',
    DB_HOST: '',
    DB_NAME: '',
    DB_PORT: 3306,
    DB_USER: 'root',
    DB_PASSWORD: '',
    NODE_ENV: environments.DEVELOPMENT,
  };

  constructor() {
    if (EnvService.instance instanceof EnvService) {
      return EnvService.instance;
    }

    const environment = process.env.NODE_ENV || environments.DEVELOPMENT;
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '3306');
    const dbName = process.env.DB_NAME || 'mysql';
    const dbUser = process.env.DB_USER || 'root';
    const dbPassword = process.env.DB_PASSWORD || '123123';

    this.vars = {
      DB_NAME: dbName,
      DB_PORT: port,
      DB_TYPE: 'mysql',
      DB_USER: dbUser,
      DB_PASSWORD: dbPassword,
      DB_HOST: host,
      NODE_ENV: environment,
    };
    EnvService.instance = this;
  }

  read(): EnvData {
    return this.vars;
  }

  isDev(): boolean {
    return this.vars.NODE_ENV === environments.DEVELOPMENT;
  }

  isProd(): boolean {
    return this.vars.NODE_ENV === environments.PRODUCTION;
  }

  isStaging(): boolean {
    return this.vars.NODE_ENV === environments.STAGING;
  }

  getEnvironmentFile(): string {
    const environment = process.env.NODE_ENV || environments.DEVELOPMENT;

    return `${environment}.env`;
  }
}
