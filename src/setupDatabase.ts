import mongoose, { mongo } from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const SERVER_PORT = 8000;
const log: Logger = config.createLogger('setupDatabase');

export default () => {
	const connect = () => {
		mongoose
			.connect(`${config.DATABASE_URL}`)
			.then(() => {
				log.info('successfully connected to database.');
			})
			.catch((error) => {
				log.error('Error connecting to database', error);
				return process.exit(1);
			});
	};
	connect();
	mongoose.connection.on('disconnected', connect);
};
