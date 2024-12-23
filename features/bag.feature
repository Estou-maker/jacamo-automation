Feature: Add Product to Bag

  As a user
  I want to navigate to the sale page, select a product, and add it to the bag
  So that I can purchase my selected items

  Scenario: Successfully add a product to the bag
    Given I am on the products page
    When I select a product from the list
    And I choose a size for the product
    And I add the product to the bag
    Then I should see a confirmation message "It's in the bag!"
