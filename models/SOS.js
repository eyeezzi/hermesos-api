const mongoose = require('mongoose')

const SOSSchema = new mongoose.Schema({
	message: String,
	recipient_phone_number: String,
	recipient_country_code: Number,
	scheduled_datetime: Date
})

module.exports = mongoose.model('SOS', SOSSchema)