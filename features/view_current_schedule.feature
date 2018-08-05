Feature: View current SOS

	#  

	Scenario: View SOS
		Given Bob has an account
		When Bob signs in to the app
		Then Bob should see his current SOS item
