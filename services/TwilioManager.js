const axios = require('axios')
var querystring = require('querystring')

const TwilioManager = {

	requestSMS: (phone_number, country_code) => {
		const payload = {
			"api_key": process.env.TWILIO_API_KEY,
			"via": process.env.VERIFICATION_TYPE || "sms",
			"code_length": process.env.VERIFICATION_CODE_LENGTH || 4,
			"phone_number": phone_number,
			"country_code": country_code
		}
		return axios.post('https://api.authy.com/protected/json/phones/verification/start', payload)
	},

	verifyCode: (phone_number, country_code, verification_code) => {
		const params = {
			"api_key": process.env.TWILIO_API_KEY,
			"verification_code": verification_code,
			"phone_number": phone_number,
			"country_code": country_code
		}
		return axios.get('https://api.authy.com/protected/json/phones/verification/check', { params: params })
	}
}

module.exports = TwilioManager