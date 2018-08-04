Feature: View current Check-in

	#  

	Scenario: View Check-in
		Given Bob has an account
		When Bob signs in to the app
		Then Bob should see his current Check-in item
