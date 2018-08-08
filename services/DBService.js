const mongoose = require('mongoose')

const DBService = {
	connect: () => {
		const conURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
		const options = {
			useNewUrlParser: true,
			retryWrites: true
		}
		return mongoose.connect(conURL, options)
	}
}

module.exports = DBService