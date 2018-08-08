const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: String,
	phone_number: String,
	country_code: Number,
	sms_remaining: Number
})

// UserSchema.methods.findByPhone = (phone_number, country_code) => {
// 	return this.findOne({phone_number: phone_number, country_code: country_code})
// }
UserSchema.methods.findSOS = (cb) => {
	return cb
}

module.exports = mongoose.model('User', UserSchema)