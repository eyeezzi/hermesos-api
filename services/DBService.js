const mongoose = require('mongoose')

const DBService = {
	connection_options: {
		useNewUrlParser: true,
		retryWrites: true,
	},
	
	db: mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, connection_options)

}