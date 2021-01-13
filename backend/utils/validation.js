exports.checkInt = (num, min) => Number.isInteger(num) && num >= min;

exports.checkWords = (str, num) => {
	const words = str.trim().split(' ');
	return words.length <= num;
};

exports.isContact = (str) => /\d{10}/.test(str);

exports.isYear = (year) => {
	const curYear = new Date().getFullYear();
	return Number.isInteger(year) && year >= curYear - 100 && year <= curYear;
};

exports.isDateInFuture = (date) => new Date(date) > Date.now();
