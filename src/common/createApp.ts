import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import passport from 'passport';
import * as controllers from '../api/v1/controllers';
import { config, validateEnvVarsConfig } from '../configs/core/config';
import { applyPassportStrategy } from '../utils/passport';

// Create server and apply configuration
export default function createApp() {
  const app: Application = express();

  // Configuration
  if (config.bodyParser && config.bodyParser.enabled) {
    if (config.bodyParser.settings.json && config.bodyParser.settings.json.enabled)
      app.use(bodyParser.json(config.bodyParser.settings.json.settings));
    if (config.bodyParser.settings.urlencoded && config.bodyParser.settings.urlencoded.enabled)
      app.use(bodyParser.urlencoded(config.bodyParser.settings.urlencoded.settings));
  }
  validateEnvVarsConfig();
  applyPassportStrategy(passport);

  app.use(cookieParser());

  // hook morganBody to express app
  morganBody(app);

  /** security header with helmet https://helmetjs.github.io/docs/ */
  app.use(helmet());

  //-- load controllers
  controllers.apiControllers.forEach((controller) => {
    app.use(`/${controllers.prefixVersion}/` + (controller.prefix ? `${controller.prefix}` : ''), controller.controller);
  });

  // Allow CORS
  if (config.CORS && config.CORS.enabled) {
    const settings = Object.keys(config.CORS.settings).map((key, index) => {
      return [key, Object.values(config.CORS.settings)[index]];
    });
    app.use((req, res, next) => {
      for (let i = 0; i < settings.length; i++) {
        res.header(settings[i][0], settings[i][1]);
      }
      next();
    });
  }

  return app;
}
