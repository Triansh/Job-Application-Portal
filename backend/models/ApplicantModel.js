const mongoose = require('mongoose');

const userModel = require('./UserModel');

const applicantSchema = new mongoose.Schema(
	{
		education: [
			{
				institution: {
					type: String,
					required: [true, 'An Institution is required'],
				},
				startYear: {
					type: Number,
					required: [true, 'A starting year is required'],
					validate: {
						validator: function (v) {
							return isYear(v);
						},
						message: 'Must be a valid year',
					},
				},
				endYear: {
					type: Number,
					validate: {
						validator: function (v) {
							return isYear(v);
						},
						message: 'Must be a valid year',
					},
				},
			},
		],
		skills: {
			type: [String],
		},

		review: {
			type: [
				{
					rating: {
						type: Number,
						required: [true, 'A review must have a rating'],
						min: [1, 'Rating must be atleast 1.'],
						max: [5, 'Rating cam be upto 5'],
					},
					rater: {
						type: mongoose.Schema.ObjectId,
						ref: 'Recruiter',
					},
				},
			],
			default: [],
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

applicantSchema.virtual('avgRating').get(function () {
	const { review } = this;
	if (!review || !review.length) return 0;

	const avgRating =
		review.reduce((prev, { rating }) => prev + rating, 0) / review.length;
	return Math.round(avgRating * 10) / 10;
});

const applicantModel = userModel.discriminator('Applicant', applicantSchema);

module.exports = applicantModel;
