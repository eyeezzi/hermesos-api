const TwilioManager = require('./TwilioManager')
const UserController = require('../controllers/UserController') //?

const AuthService = {

	sign_up_request_sms: async (req, res) => {
		const data = req.body

		// Ensure name, phone_number, and country_code are present
		if (!(data.name && data.phone_number && data.country_code)) {
			const err = new Error('One or more required fields are null')
			err.statusCode = 400
			throw err
		}

		// temporarily save user-info for token verification step
		res.cookie('user_info', JSON.stringify(data))

		try {
			const smsRes = await TwilioManager.requestSMS(data.phone_number, data.country_code)
			return res.send(smsRes.data)
		} catch (err) {
			err.statusCode = 500
			throw err
		}
	},

	sign_up_verify_code: async (req, res) => {
		// Ensure presence of name, phone_number, and country_code in cookie from sms-request step
		// Also ensure verification code is present
		const { name, phone_number, country_code } = JSON.parse(req.cookies['user_info']) || {}
		const verification_code = req.body.verification_code || {}
		
		if (!(name && phone_number && country_code && verification_code)) {
			const err = new Error('One or more required fields are null')
			err.statusCode = 400
			throw err
		}

		try {
			const verifRes = await TwilioManager.verifyCode(phone_number, country_code, verification_code)
			const user = await UserController.createUser(name, phone_number, country_code)
			// todo: generate JWT
			// todo: return JWT
			return res.send(verifRes.data)
		} catch (err) {
			err.statusCode = 500
			throw err
		}
	},
	
	sign_in_request_sms: async (req, res) => {
		// assert presence of: phone and country_code

		// assert user with phone exits in DB

		// temp save input in cookie

		// send user info to Twilio to request SMS

		// return response to client
	},
	sign_in_verify_code: async (req, res) => {
		// assert presence of: phone and country_code in temp cookie
		// assert presence of: verification code

		// send code + tmp data to Twilio for verification

		// if failure: return message to client

		// otherwise, generate JWT
		// return jwt to client
	},
	delete_account: async (req, res) => {
		// assert jwt is valid

		// delete all sos with jwt.userID

		// delete user with jwt.userID

		// remove jwt from token

		// return status code to client
	},
}

module.exports = AuthService