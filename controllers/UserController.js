const User = require('../models/User')

const UserController = {

	me: async (req, res) => {

	},
	createUser: async (name, phone_number, country_code) => {
		const user = new User({
			name: name,
			phone_number: phone_number,
			country_code: country_code,
			sms_remaining: process.env.SIGNUP_SMS_BONUS || 0
		})
		return user.save()
	},
	findUser: async (phone_number, country_code) => {
		return User.findOne({phone_number: phone_number, country_code: country_code})
	}
}

module.exports = UserController