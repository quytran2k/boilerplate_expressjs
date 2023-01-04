import { jsonSuccess } from '../../utils/system';
import logger from '../../utils/winston';
import { typeOrmConfig } from '../database/ormconfig';

// Connect to Database before running the application
const preBoot = () => {
  typeOrmConfig
    .initialize()
    .then(() => {
      // here you can start to work with your database
      logger.info(`Connecting DB`);

      return jsonSuccess();
    })
    .catch((error) => logger.error(error));
};

const boot = async () => {
  //-- this boot runs after all services had successfully booted
  return jsonSuccess();
};

const preExit = async () => {
  //-- this exit runs before any services' exit
  return jsonSuccess();
};

const exit = async () => {
  //-- this exit runs after all services had exited
  return jsonSuccess();
};

export { preBoot, boot, preExit, exit };
