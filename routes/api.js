const express = require('express')
const UserController = require('../controllers/UserController')
const SOSController = require('../controllers/SOSController')

const api = express.Router()

api.route('/me')
	.get(UserController.me)

api.route('/sos')
	.post(SOSController.post)
	.get(SOSController.list)

api.route('/sos/:id')
	.delete(SOSController.delete)

// just for test
api.route('/users')
	.post(async (req, res) => {
		let user = await UserController.createUser('test', '7703839393', 1)
		res.json(user)
	})

module.exports = api

/*
Express sub routers are awesome for modularizing routes
*/