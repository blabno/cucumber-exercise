Feature: Default page

  Scenario: As anonymous user I enter bare domain into browser url
    Given I am an anonymous user
    When I browse to the "/"
    Then I should be directed to "/tasks"
    And I should see "Tasks" in "header.title"
