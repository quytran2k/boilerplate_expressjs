import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import createApp from './common/createApp';
import { preBoot } from './configs/core/boot';
import logger from './utils/winston';
dotenv.config();

const app = createApp();

//-- pre-boot and load data database
preBoot();

/**
 * Use custom error reporting in JSON format.
 */
app.use((err: { statusCode: number }, _req: Request, res: Response, next: NextFunction) => {
  if (err.statusCode) {
    if (res.headersSent) {
      // important to allow default error handler to close connection if headers already sent
      return next(err);
    }
    res.set('Content-Type', 'application/json');
    res.status(err.statusCode);
    res.json(err);
  } else {
    next(err);
  }
});

/**
 * Starts a listener and reports it.
 */
const port = process.env.APP_PORT || 3000;
const server = app.listen(port, () => {
  logger.info(`Server running at port ${port}`);
});

/**
 * Stops the server by closing the scocket, ending the event loop.
 */
function stopServer() {
  server.close(() => {
    logger.warn(`Server closed`);
    process.exit(0);
  });
}

/**
 * Signal is interrupt
 */
process.on('SIGTERM', () => {
  logger.warn(`interrupt signal`);
  stopServer();
});

/**
 * Stop on SIGINT
 */
process.on('SIGINT', () => {
  logger.warn(`SIGINT received'`);
  stopServer();
});

/**
 * Stop on uncaught exceptions.
 */
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception', error, error.stack);
  logger.error('uncaughtException');
  stopServer();
});

/**
 * Stop on unhandled promise rejections.
 */
process.on('unhandledRejection', (rejection) => {
  console.error('Unhandled rejection', rejection);
  logger.error('unhandledRejection');
  stopServer();
});
