Feature: Navigate through the catalog and verify product visibility

  As a user
  I want to navigate through the catalog
  So that I can verify products are displayed correctly

  Scenario: Navigate to the sale page and verify products are visible
    Given I am on the sale page
    When I scroll through the product list
    Then all products should be visible on the page
