Feature: Login functionality

  Background: User navigates to the login page from the home page
    Given I navigate to the login page from the home page

  Scenario: Successful login
    When I enter a valid username and password
    Then I should be redirected to the dashboard

  Scenario: Unsuccessful login
    When I enter an invalid username or password
    Then I should see an error message

  Scenario: Login requires identity confirmation
    When I enter a valid username and password
    Then I should see the confirmation prompt or be redirected to the dashboard
