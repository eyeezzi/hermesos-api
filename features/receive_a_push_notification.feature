Feature: Receive a push notification

	# 

	Scenario: Receive Check-in reminder
		Given Bob creates a Check-in
		When there is 5 minutes left for Check-in to expire.
		Then Bob should receive a push notification.