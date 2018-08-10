const SOS = require('../models/SOS')

const SOSController = {
	create: async (req, res) => {
		// Ensure user is known
		const userID = req.claims._id

		if (!userID) {
			return res.status(500).json({ message: 'No user id in request' })
		}

		// Ensure request has required properties
		const { message, to_name, to_phone_number, to_country_code, send_at } = req.body
		
		if (!(message && to_name && to_country_code && to_country_code && send_at)) {
			return res.status(400).json({ message: 'One or more attributes missing.' })
		}

		const doc = new SOS({
			message: message,
			to_name: to_name,
			to_phone_number: to_phone_number,
			to_country_code: to_country_code,
			send_at: send_at, // ISO8601 datetime string is auto converted to UTC date
			created_by: userID
		})

		try {
			const sos = await doc.save()
			res.json(sos.toObject())
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},

	list: async (req, res) => {
		const userID = req.claims._id

		if (!userID) {
			return res.status(500).json({ message: 'No user id in request' })
		}

		try {
			sosList = await SOS.find({created_by: userID})
			return res.json(sosList)
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},

	delete: async (req, res) => {
		const userID = req.claims._id

		if (!userID) {
			return res.status(500).json({ message: 'No user id in request' })
		}

		try {
			const queryRes = await SOS.deleteOne({_id: req.params.id, created_by: userID})
			return res.json(queryRes)
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},

	deleteAllByUser: async (userID) => {
		return SOS.deleteMany({ created_by: userID })
	}
}

module.exports = SOSController