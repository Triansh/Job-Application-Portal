const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE_ATLAS;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Database Connection Successful !!'))
	.then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)));

process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	process.exit(1);
});
