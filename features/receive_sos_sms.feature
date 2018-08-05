Feature: Receive a SOS SMS from a friend

	# 

	Scenario: Receive SOS SMS
		Given Bob schedules an SOS for Jane with "Jane's phone number"
		When Bob does not respond to 3 SOS reminders
		Then Jane should receive an SMS message telling her to call Bob.
