const mongoose = require('mongoose')

const SOSSchema = new mongoose.Schema({
	message: String,
	to_name: String,
	to_phone_number: String,
	to_country_code: Number,
	send_at: Date,
	created_by: String
})

module.exports = mongoose.model('SOS', SOSSchema)