const express = require('express')
const auth = express.Router()
const AuthService = require('../services/AuthService')

auth.route('/sign_up/request_sms')
	.get(AuthService.sign_up_request_sms)

auth.route('/sign_up/verify_code')
	.get(AuthService.sign_up_verify_code)

auth.route('/sign_in/request_sms')
	.get(AuthService.sign_in_request_sms)

auth.route('/sign_in/verify_code')
	.get(AuthService.sign_in_verify_code)

auth.route('/delete_account')
	.get(AuthService.delete_account)

module.exports = auth
