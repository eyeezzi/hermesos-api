const User = require('../models/user')
const mongoose = require('mongoose')

const UserController = {

	me: async (req, res) => {

	}
}

module.exports = UserController

/* 
createUser: async (name, phone_number, country_code, sms_remaining) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		phone_number: phone_number,
		country_code: country_code,
		sms_remaining: sms_remaining
	})

	try {
		const user = await user.save()
		console.log(user)
	} catch (err) {
		console.error(err)
	}
} 
*/