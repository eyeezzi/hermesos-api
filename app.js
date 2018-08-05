const dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
	const result = dotenv.config()
	if (result.error) {
		throw result.error
	}
}

const User = require('./models/user')
const mongoose = require('mongoose')

const db_connection_options = {
	useNewUrlParser: true,
	retryWrites: true,
	// dbName: process.env.DB_NAME,
	// user: process.env.MONGODB_USERNAME,
	// pass: process.env.MONGODB_PASSWORD
}

const db = mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, db_connection_options)
// const db = mongoose.connect(process.env.MONGODB_URL, db_connection_options)
db.then(x => {
	console.log('Succeeded!')

	createUser('Alice', '123-456-7890', '234', '2')
})
.catch(err => {
	console.error(`Failed with error: ${err}`)
})

const createUser = (name, phone_number, country_code, sms_balance) => {

	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		phone_number: phone_number,
		country_code: country_code,
		sms_balance: sms_balance
	})

	user.save()
		.then(result => {
			console.log(result)
		})
		.catch(err => {
			console.log(err)
		})
}