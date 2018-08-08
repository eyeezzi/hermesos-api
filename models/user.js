const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	phone_number: String,
	country_code: Number,
	sms_remaining: Number,
	// sos_ids: Int16Array
})

module.exports = mongoose.model('User', userSchema)