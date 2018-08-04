Feature: Receive a Check-in SMS from a friend

	# 

	Scenario: Receive Check-in SMS
		Given Bob creates a Check-in reminder for Jane with "jane's phone number"
		When Bob does not respond to 3 Check-in reminders
		Then Jane should receive an SMS message telling her to call Bob.
