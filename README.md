
# Project Documentation

## Framework Setup and Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <[repository-url](https://github.com/Estou-maker/jacamo-automation/)>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies using npm:
   ```bash
   npm install
   ```

## Dependencies

The project uses the following dependencies:

### Production Dependencies
- **@playwright/test**: ^1.49.1
- **playwright**: ^1.49.1
- **winston**: ^3.17.0

### Development Dependencies
- **@cucumber/cucumber**: ^11.1.1
- **@types/node**: ^22.10.2
- **chai**: ^5.1.2
- **cucumber-html-reporter**: ^6.0.0
- **ts-node**: ^10.9.2
- **typescript**: ^5.7.2

## Test Execution

To execute tests, use the following commands:
- Run tests: 
  ```bash
  npm run test
  ```
- Run tests with HTML report generation:
  ```bash
  npm run test-with-report
  ```

## Viewing Reports

1. Test execution generates reports in the `reports` directory.
2. Open the report file (e.g., `cucumber_report.html`) in your browser to view the test results.

## Configuration Files

- **`tsconfig.json`**:
  - Sets the Typescript configuration with target ES6, module system CommonJS, and includes files in `features/**/*.ts` while excluding `node_modules`.
- **`default.json`**:
  - Environment-specific configuration file containing:
    - **Base URL**: `https://www.jacamo.co.uk`
    - **Timeout**: 30,000 ms
    - **Credentials**:
      - Valid username/password for positive testing.
      - Invalid credentials for negative testing.

## Project Structure

- `features/`: Contains test feature files.
- `logs/`: Stores log files.
- `page_objects/`: Includes page object models for modular test scripts.
- `reports/`: Holds generated reports after test execution.
- `utilities/`: Includes utility functions and helper scripts.

## Step Definition Files

- **`login.steps.ts`**: Implements the test steps for the Login feature.
- **`title.steps.ts`**: Implements the test steps for the Title feature.
- **`bag.steps.ts`**: Implements the test steps for the Bag feature.
- **`catalog.steps.ts`**: Implements the test steps for the Catalog feature.

## Feature Files

- **`bag.feature`**:
  - **Feature**: Add Product to Bag
    - As a user, navigate to the sale page, select a product, and add it to the bag to purchase selected items.

- **`catalog.feature`**:
  - **Feature**: Navigate through the catalog and verify product visibility
    - As a user, navigate through the catalog to ensure products are displayed correctly.

- **`login.feature`**:
  - **Feature**: Login Functionality
    - Background: User navigates to the login page from the home page.

- **`title.feature`**:
  - **Feature**: Jacamo Website Testing
    - Scenario: Verify Jacamo Homepage Title matches expectations.

## Page Object Files

- **`LoginPage.ts`**: Represents the Login page in the project.
- **`BagPage.ts`**: Represents the Bag page in the project.
- **`CatalogPage.ts`**: Represents the Catalog page in the project.

## Utility Files

- **`config.ts`**: Configuration file for setting up environment-specific variables.
- **`generate-html-report.ts`**: Utility script to generate HTML reports for test execution results.
- **`logger.ts`**: Utility script for logging application and test activities.

## Other Information

- Make sure to configure the `default.json` file to match your environment setup.
- Typescript is used for this project. Refer to `tsconfig.json` for compiler configuration.

