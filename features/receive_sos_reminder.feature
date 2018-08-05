Feature: Receive a push notification

	# 

	Scenario: Receive SOS reminder
		Given Bob creates a SOS
		When there is 5 minutes left for SOS to expire.
		Then Bob should receive a push notification.