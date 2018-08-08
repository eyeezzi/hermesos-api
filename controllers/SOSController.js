const SOS = require('../models/SOS')
const SOSController = {
	post: async (req, res) => {
		// preq: jwt.userID
	},
	delete: async (req, res) => {
		// preq: jwt.userID, sos.id
	},
	list: async (req, res) => {
		// preq: jwt.userID
	},
	createSOS: async (message, name, phone, country_code, date) => {
		// todo get the uid from the jwt

		const sos = new SOS({
			message: message,
			to_name: name,
			to_phone_number: phone,
			to_country_code: country_code,
			send_at: date,
			created_by: 'user-id'
		})
		return sos.save()
	}
}

module.exports = SOSController