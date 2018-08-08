const express = require('express')
const UserController = require('../controllers/UserController')
const SOSController = require('../controllers/SOSController')

const api = express.Router()

api.route('/me')
	.get(UserController.me)

// api.route('/sos')
// 	.post(SOSController.post)
// 	.get(SOSController.list)

api.route('/sos/:id')
	.delete(SOSController.delete)

// just for test
api.route('/sos')
	.post(async (req, res) => {
		let sos = await SOSController.createSOS('help', 'john', '747484773838', '1', new Date())
		res.json(sos)
	})

module.exports = api

