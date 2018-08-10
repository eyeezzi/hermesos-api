const User = require('../models/User')
const SOSController = require('./SOSController')

const UserController = {

	me: async (req, res) => {
		const userID = req.claims._id

		if (!userID) {
			return res.status(500).json({message: 'No user id in request'})
		}

		try {
			const user = await User.findById(userID)
			res.json(user.toObject())
		} catch (err) {
			res.status(500).json({message: err.message})
		}
	},
	
	// should probably be in the user repo. That is the User model
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
	},

	deleteAccount: async (req, res) => {
		const userID = req.claims._id

		if (!userID) {
			return res.status(500).json({message: 'No user id in request'})
		}

		try {
			// TODO: do this in one transaction
			const _ = await SOSController.deleteAllByUser(userID)
			const usrQres = await User.deleteOne({_id: userID})
			res.status(200).json(usrQres)
		} catch (err) {
			res.status(500).json({message: err.message})
		}
	}

}

module.exports = UserController