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
	},

	sendSMS: async (phone_number, country_code, message) => {
		const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`
		const params = {
			"From": process.env.TWILIO_PHONE_NUMBER,
			"To": `+${country_code}${phone_number}`,
			"Body": message
		}
		const headers = {
			"Content-Type": "application/x-www-form-urlencoded",
			"Accept": "application/json"
		}
		const auth = {
			username: process.env.TWILIO_ACCOUNT_SID,
			password: process.env.TWILIO_AUTH_TOKEN
		}
		return axios.post(endpoint, querystring.stringify(params), { headers: headers, auth: auth })
	}
}

module.exports = TwilioManager