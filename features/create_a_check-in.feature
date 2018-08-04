Feature: Create a Check-in

	# ... 

	Scenario: Create Check-in
		Given Bob provides a valid "Check-in information"
		When Bob clicks the "create" button on the Check-in form
		Then App shows Check-in created.
		