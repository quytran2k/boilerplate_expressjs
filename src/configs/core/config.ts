import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';
import logger from '../../utils/winston';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  //-- see npm body-parser for more settings
  bodyParser: {
    enabled: true,
    settings: {
      json: { enabled: true, settings: { limit: '2mb' } },
      urlencoded: {
        enabled: true,
        settings: { extended: false, limit: '2mb' },
      },
    },
  },

  CORS: {
    enabled: true,
    settings: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Access-Control-Allow-Methods': '*',
    },
  },

  passport: {
    secret: '<Add_Your_Own_Secret_Key>',
    expiresIn: 10000,
  },
};

export const validateEnvVarsConfig = () => {
  try {
    const envVarsSchema = Joi.object()
      .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
      })
      .unknown();

    const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  } catch (err: unknown) {
    logger.error(`Config validation error: ${err as Error}`);
  }
};
