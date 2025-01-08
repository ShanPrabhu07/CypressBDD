Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I enter valid username and password
    Then I should see the dashboard
