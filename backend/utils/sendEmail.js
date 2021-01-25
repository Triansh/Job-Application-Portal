const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

module.exports = sendMail = async (options) =>
	transport.sendMail({
		from: process.env.EMAIL,
		to: options.to,
		subject: options.subject,
		text: options.text,
	});
