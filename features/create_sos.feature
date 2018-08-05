Feature: Create a SOS

	# ... 

	Scenario: Create SOS
		Given Bob provides a valid "SOS information"
		When Bob clicks the "create" button on the "create SOS form"
		Then App shows SOS created.
		