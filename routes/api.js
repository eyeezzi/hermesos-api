const express = require('express')
const api = express.Router()
const UserController = require('../controllers/UserController')
const SOSController = require('../controllers/SOSController')

api.route('/me')
	.get(UserController.me)

api.route('/sos')
	.post(SOSController.post)
	.get(SOSController.list)

api.route('/sos/:id')
	.delete(SOSController.delete)

module.exports = api

/*
Express sub routers are awesome for modularizing routes
*/