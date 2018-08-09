const express = require('express')
const UserController = require('../controllers/UserController')
const SOSController = require('../controllers/SOSController')
const { errorWrapper, authShield } = require('./middleware')

const api = express.Router()

api.use(authShield)

api.route('/me')
	.get(errorWrapper(UserController.me))

api.route('/sos')
	.post(errorWrapper(SOSController.createSOS))
	// .get(SOSController.list)

// api.route('/sos/:id')
// 	.delete(SOSController.delete)

// // just for test
// api.route('/sos')
// 	.post(async (req, res) => {
// 		let sos = await SOSController.createSOS('help', 'john', '747484773838', '1', new Date())
// 		res.json(sos)
// 	})

module.exports = api

