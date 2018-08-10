const SOS = require('../models/SOS')
const TwilioManager = require('./TwilioManager')

const SOSDispatcher = {

	// get all SOS scheduled to be delivered within the last POLLING_VACATION
	processJobs: async () => {
		console.log("cron ---------")

		// get all SOS where s.send_at >= (now - POLLING_VACATION) && s.send_at <= now
		const cursor = SOS.find({ send_at: { $lt: Date() } }).cursor()
		
		for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
			const sos = doc.toObject()
			try {
				const smsRes = await TwilioManager.sendSMS(sos.to_phone_number, sos.to_country_code, sos.message)
				const _ = await SOS.findByIdAndDelete(doc.id)
			} catch (err) {
				console.log('CRITICAL: Failed to send SMS with error ', err.message)
			}
		}
	}

}

module.exports = SOSDispatcher