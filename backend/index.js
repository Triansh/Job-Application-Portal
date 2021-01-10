const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('Database Connection Successful !!'))
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	);
