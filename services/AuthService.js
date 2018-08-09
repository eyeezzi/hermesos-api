const TwilioManager = require('./TwilioManager')
const UserController = require('../controllers/UserController') //?
const jwt = require('jsonwebtoken')

const AuthService = {

	sign_up_request_sms: async (req, res) => {
		// const data = req.body
		const { name, phone_number, country_code } = req.body

		// Ensure name, phone_number, and country_code are present
		if (!(name && phone_number && country_code)) {
			const err = new Error('One or more required fields are null')
			err.statusCode = 400
			throw err
		}

		// Ensure user with phone_number AND country_code does not currently exits
		const user = await UserController.findUser(phone_number, country_code)
		if (user) {
			const err = new Error('User already exists')
			err.statusCode = 404
			throw err
		}

		// temporarily save user-info for token verification step
		res.cookie('user_info', JSON.stringify(req.body))

		try {
			const smsRes = await TwilioManager.requestSMS(phone_number, country_code)
			return res.send(smsRes.data)
		} catch (err) {
			err.statusCode = 500
			throw err
		}
	},

	sign_up_verify_code: async (req, res) => {
		// Ensure we have the temporary user info from the SMS request step
		let user_info = {}

		try {
			user_info = JSON.parse(req.cookies['user_info'])
		} catch (err) {
			err = new Error('Missing or invalid data from SMS Request step')
			err.statusCode = 400
			throw err
		}

		// Ensure presence of name, phone_number, and country_code in cookie from sms-request step
		const { name, phone_number, country_code } = user_info
		const verification_code = req.body.verification_code
		
		if (!(name && phone_number && country_code && verification_code)) {
			const err = new Error('One or more required fields are null')
			err.statusCode = 400
			throw err
		}

		try {
			const _ = await TwilioManager.verifyCode(phone_number, country_code, verification_code)
			const user = await UserController.createUser(name, phone_number, country_code)
			const jwt = createJWT(user.toObject())
			return res.json({jwt: jwt})
		} catch (err) {
			err.statusCode = 500
			throw err
		}
	},
	
	sign_in_request_sms: async (req, res) => {
		// assert presence of: phone and country_code
		const {country_code, phone_number} = req.body
		
		if (!(country_code && phone_number)) {
			const err = new Error('Missing country_code or phone_number')
			err.statusCode = 400
			throw err
		}

		const user = await UserController.findUser(phone_number, country_code)
		if (!user) {
			const err = new Error('No such user found')
			err.statusCode = 404
			throw err
		}

		res.cookie('user_info', JSON.stringify(req.body))

		try {
			const smsRes = await TwilioManager.requestSMS(phone_number, country_code)
			return res.send(smsRes.data)
		} catch (err) {
			err.statusCode = 500
			throw err
		}
	},

	sign_in_verify_code: async (req, res) => {
		// Ensure we have the temporary user info from the SMS request step
		let user_info = {}

		try {
			user_info = JSON.parse(req.cookies['user_info'])
		} catch (err) {
			err = new Error('Missing or invalid data from SMS Request step')
			err.statusCode = 400
			throw err
		}

		// Ensure the user info are what we expect
		const { phone_number, country_code } = user_info
		const verification_code = req.body.verification_code
		
		if (!(phone_number && country_code && verification_code)) {
			const err = new Error('Missing any of: phone_number, country_code, or verification_code')
			err.statusCode = 400
			throw err
		}

		try {
			const _ = await TwilioManager.verifyCode(phone_number, country_code, verification_code)
			const user = await UserController.findUser(phone_number, country_code)
			const jwt = createJWT(user.toObject())
			return res.json({jwt: jwt})
		} catch (err) {
			err.statusCode = 500
			throw err
		}
	},

	delete_account: async (req, res) => {
		// assert jwt is valid

		// delete all sos with jwt.userID

		// delete user with jwt.userID

		// remove jwt from token

		// return status code to client
	}
}

const createJWT = (claims) => {
	const options = {
		algorithm: 'HS256',
		expiresIn: parseInt(process.env.JWT_AGE_SECS) || 3600
	}
	const token = jwt.sign(claims, process.env.JWT_SIGNING_SECRET, options)
	return token
}

const verifyJWT = (token) => {
	const options = {
		algorithms: ['HS256'],
		maxAge: parseInt(process.env.JWT_AGE_SECS) || 3600
	}
	const claims = jwt.verify(token, process.env.JWT_SIGNING_SECRET, options)
	return claims
}

// :( hack: createJWT and verifyJWT should all be inside the AuthService

// module.exports.AuthService = AuthService
// module.exports.createJWT = createJWT
// module.exports.verifyJWT = verifyJWT

module.exports = {
	AuthService: AuthService,
	createJWT: createJWT,
	verifyJWT: verifyJWT
}