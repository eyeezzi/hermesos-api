const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const AuthService = require('../services/AuthService')
const { errorWrapper } = require('./middleware')

const auth = express.Router()
auth.use(cookieParser())
auth.use(bodyParser.json())

auth.route('/sign_up/request_sms')
	.post(errorWrapper(AuthService.sign_up_request_sms))

auth.route('/sign_up/verify_code')
	.post(errorWrapper(AuthService.sign_up_verify_code))

auth.route('/sign_in/request_sms')
	.post(errorWrapper(AuthService.sign_in_request_sms))

auth.route('/sign_in/verify_code')
	.post(AuthService.sign_in_verify_code)

auth.route('/delete_account')
	.get(AuthService.delete_account)

module.exports = auth
