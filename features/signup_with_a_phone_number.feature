Feature: Signup with a phone number

	# A user can signup with a name and a phone number.
	# The app will send a confirmation code via SMS and the
	# user must enter this code to complete the sign-up process. 

	Scenario: Signup attempt
		Given Bob provides a valid "name" and "phone number"
		When Bob clicks the "submit" button on the signup form
		Then Bob should receive an SMS message with a verification code.

	Scenario: Phone number verification
		Given Bob receives an SMS message with a "verification code"
		When Bob enters the "verification code" on the confirmation page.
		Then the App shows a dashboard for Bob.