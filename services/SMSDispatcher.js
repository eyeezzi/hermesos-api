const MongoClient = require('mongodb').MongoClient;
const cron = require("node-cron")
const axios = require('axios')
var querystring = require('querystring')

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
const SCHEDULE = process.env.SOS_DISPATCHER_CRON_SCHEDULE || '* * * * *'

async function startCron() {
	try {
		const client = await MongoClient.connect(DB_URL)
		const db = client.db()
		let _ = cron.schedule(SCHEDULE, () => {
			processSOS(db)
		})
	} catch (err) {
		throw Error(`MongoDB connection failed: ${err.message}`)
	}
}

async function processSOS(db) {
	console.log(`[${new Date().toISOString()}] [cron] [processSOS]`)

	try {
		const SOSCollection = await getCollection(db, 'sos')
		const cursor = SOSCollection.find({send_at: {$lte: new Date()} })
		
		while (await cursor.hasNext()) {
			const sos = await cursor.next()
			await sendSMS(sos.to_phone_number, sos.to_country_code, sos.message)
			await SOSCollection.deleteOne({_id: sos._id})
		}
	} catch (err) {
		console.log(err.message)
	}
}

// a wrapper to promisify mongodb collection getting
async function getCollection(db, collectionName) {
	return new Promise((resolve, reject) => {
		db.collection(collectionName, {strict: true}, function(err, col) {
			return err ? reject(err) : resolve(col)
		})
	})
}

async function sendSMS (phone_number, country_code, message) {
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
	try {
		return axios.post(endpoint, querystring.stringify(params), { headers: headers, auth: auth })
	} catch (err) {
		throw Error(`Failed to send SMS with error: ${ err.response || err.message }`)
	}
}

module.exports = startCron

/*
Mongo DB Cloud Atlas has a limit of 100 connections. Be careful not to start a new DB connection for every cron op.
*/