Feature: Jacamo Website Testing

  Scenario: Verify Jacamo Homepage Title
    Given I open the Jacamo homepage
    Then the title should contain "Men’s Clothing in Sizes S to 6XL – For Every Man | Jacamo"
