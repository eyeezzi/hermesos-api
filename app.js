const dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
	const result = dotenv.config()
	if (result.error) {
		throw result.error
	}
}

const mongoose = require('mongoose')

const db_connection_options = {
	useNewUrlParser: true,
	dbName: process.env.MONGODB_DATABASE,
	user: process.env.MONGODB_USERNAME,
	pass: process.env.MONGODB_PASSWORD
}

const db = mongoose.connect(process.env.MONGODB_URL, db_connection_options)
db.then(x => {
	console.log('Succeeded!')
})
.catch(err => {
	console.error(`Failed with error: ${err}`)
})