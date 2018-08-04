# Bank of Lessons while working on the Checkin App

## How to write better Gherkin feature files

1. Gherkin features are user-facing things your app does. That is, what the user can tell a friend about your app. Everything else is an implemenation detail.

2. Write the list of Features first before fleshing-out each one with Scenarios and Steps. This prevents writers block.

3. Scenarios should describe the 'what' of your app, not the 'how'. The details of the steps should be in the implemenation. See https://docs.cucumber.io/bdd/better-gherkin/

4. In Gherkin, one scenario should cover only one behavior. That is, a scenario should have only one 'Given-When-Then' in that order.

5. Respect the purpose of each step type: 'Given's setup initial state, 'When's perform an action, and 'Then's verify an outcome.

6. Use present tense for Whens and Thens. When steps should indicate than an action is presently happening.

## Steps I am taking to manage this project

1. Think up the idea: is it useful? Who will use it? How will they use it (mobile, desktop)?

2. Sketch some architecture to check feasibility. That is, How complex is it (parties involved)? Do I have the skills to execute? How long will it take to get an MVP? Cost?

3. Write the features from a user perspective. Avoid internal implementation details.

4. Further refine the features with Scenarios and Steps in Gherkin syntax.

5. For each feature, draw *a diagram* showing how the architecture will provide it.