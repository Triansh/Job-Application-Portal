class BasicFilter {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const fieldsToExclude = ['page', 'sort', 'fields', 'limit'];
		fieldsToExclude.forEach((item) => delete queryObj[item]);
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte)\b/g,
			(match) => `$${match}`
		);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}
		return this;
	}
}


module.exports= BasicFilter;