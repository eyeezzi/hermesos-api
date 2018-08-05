Feature: Sign in with a phone number

	# A user can signup with a name and a phone number.
	# The app will send a confirmation code via SMS and the
	# user must enter this code to complete the sign-up process. 

	Scenario: Signup attempt
		Given Bob is a registered user
		And Bob is unauthenticated
		When Bob enters "phone number" and clicks "request sms" on the "sign in form"
		Then Bob should receive an SMS message with a verification code.

	Scenario: Phone number verification
		Given Bob receives an SMS message with a "verification code"
		When Bob enters the "verification code" on the "sign in form".
		Then the App loads the dashboard page.
		