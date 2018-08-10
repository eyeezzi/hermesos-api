const express = require('express')
const UserController = require('../controllers/UserController')
const SOSController = require('../controllers/SOSController')
const { errorWrapper, authShield } = require('./middleware')

const api = express.Router()

api.use(authShield)

api.route('/me')
	.get(errorWrapper(UserController.me))
	.delete(errorWrapper(UserController.deleteAccount))

api.route('/sos')
	.post(errorWrapper(SOSController.create))
	.get(errorWrapper(SOSController.list))

api.route('/sos/:id')
	.delete(errorWrapper(SOSController.delete))

module.exports = api

