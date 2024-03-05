import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

/**
 * Test to verify that a login button is visible on page load.
 */
test("on page load, I see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

/**
 * Test to verify that input boxes are not visible until login.
 */
test("on page load, I dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

/**
 * Test to verify that input box text changes after typing.
 */
test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

/**
 * Test to verify view functionality for stardata.csv.
 */
test("view functionality (table generation) for stardata.csv", async ({
  page,
}) => {
  await page.goto("http://localhost:8006/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load stardata.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByLabel("Submit").click();

  // Checking the contents of various cells
  await expect(page.getByRole("cell", { name: "Bailee" })).toHaveText("Bailee");
  await expect(page.getByRole("cell", { name: "191", exact: true })).toHaveText(
    "191"
  );
  await expect(page.getByRole("cell", { name: "Lynn" })).toHaveText("Lynn");
});

/**
 * Test to verify view functionality for censusdata.csv.
 */
test("view functionality (table generation) for censusdata.csv", async ({
  page,
}) => {
  await page.goto("http://localhost:8006/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load censusdata.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByLabel("Submit").click();

  // Checking the contents of various cells
  await expect(page.getByRole("cell", { name: "Black" })).toHaveText("Black");
  await expect(
    page.getByRole("cell", { name: "Native American/American" })
  ).toHaveText("Native American/American Indian");
  await expect(page.getByRole("cell", { name: "0%" })).toHaveText("0%");
  // Testing header content
  await expect(
    page.getByRole("cell", { name: "Average Weekly Earnings" })
  ).toHaveText("Average Weekly Earnings");
  await expect(page.getByRole("cell", { name: "Data Type" })).toHaveText(
    "Data Type"
  );
});

/**
 * Test to verify view functionality for noHeaders.csv.
 */
test("view functionality (table generation) for noHeaders.csv", async ({
  page,
}) => {
  await page.goto("http://localhost:8006/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load noHeaders.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByLabel("Submit").click();

  // Checking the contents of various cells
  await expect(page.getByRole("cell", { name: "Black" })).toHaveText("Black");
  await expect(
    page.getByRole("cell", { name: "Native American/American" })
  ).toHaveText("Native American/American Indian");
  await expect(page.getByRole("cell", { name: "0%" })).toHaveText("0%");
});

/**
 * Test to verify valid search commands for multiple CSV files.
 */
test("valid search commands for stardata.csv, censusdata.csv, noHeaders.csv/loading multiple files at the same time", async ({
  page,
}) => {
  // Testing search for stardata.csv
  await page.goto("http://localhost:8006/");
  await page.getByLabel("Login").click();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load stardata.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  // Entering full column name
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search ProperName Lynn");
  await page.getByLabel("Submit").click();
  await expect(page.getByRole("table").nth(3)).toBeVisible();
  await expect(page.getByRole("cell", { name: "Lynn" }).nth(1)).toHaveText(
    "Lynn"
  );
  await expect(page.getByRole("cell", { name: "194" }).nth(4)).toHaveText(
    "194"
  );
  // Entering column name by index
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 1 Lynn");
  await page.getByLabel("Submit").click();
  await expect(page.getByRole("cell", { name: "Lynn" }).nth(2)).toHaveText(
    "Lynn"
  );
  await expect(page.getByRole("cell", { name: "5.56202" }).nth(2)).toHaveText(
    "5.56202"
  );

  // Testing search for noHeaders.csv
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load noHeaders.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search 1 Multiracial");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByRole("cell", { name: "Multiracial" }).nth(1)
  ).toHaveText("Multiracial");

  await expect(
    page.getByRole("cell", { name: "8883.049171" }).nth(1)
  ).toHaveText("8883.049171");
  await page.getByPlaceholder("Enter command here!").fill("search Multiracial");
  await page.getByLabel("Submit").click();
  await expect(page.getByRole("cell", { name: "$971.89" }).nth(2)).toHaveText(
    "$971.89"
  );

  // Searching a different CSV to check loaded files at the same time
  await expect(page.getByRole("cell", { name: "Lynn" }).nth(1)).toHaveText(
    "Lynn"
  );
});

/**
 * Test to verify mode switching to verbose.
 */
test("mode switching to verbose", async ({ page }) => {
  // Testing search for stardata.csv
  await page.goto("http://localhost:8006/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load stardata.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search ProperName Lynn");
  await page.getByLabel("Submit").click();

  await expect(page.getByRole("cell", { name: "Command" }).first()).toHaveText(
    "Command"
  );
  await expect(
    page.getByRole("cell", { name: "Mode changed to verbose" })
  ).toHaveText("Mode changed to verbose");
  await expect(page.getByRole("cell", { name: "Output" }).nth(2)).toHaveText(
    "Output"
  );
});

/**
 * Test to verify different types of invalid inputs/commands.
 */
test("different types of invalid inputs/commands", async ({ page }) => {
  // Testing search for stardata.csv
  await page.goto("http://localhost:8006/");
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load wrong.csv");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("No such filename found")).toHaveText(
    "No such filename found"
  );
  await page.getByPlaceholder("Enter command here!").fill("viewww");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Bad command.")).toHaveText("Bad command.");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load stardata.csv");
  await page.getByLabel("Submit").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search CS32 Class");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Invalid search query 'CS32,")).toHaveText(
    "Invalid search query 'CS32,Class'"
  );
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search ProperName Brown");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Invalid search query 'ProperName,Brown'")
  ).toHaveText("Invalid search query 'ProperName,Brown'");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 85 Lynn");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByRole("cell", { name: "Column index doesn't exist" })
  ).toHaveText("Column index doesn't exist");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByRole("cell", { name: "no search query provided" })
  ).toHaveText("no search query provided");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search Pizza Lynn");
  await page.getByLabel("Submit").click();
  await expect(
    page.locator("table").filter({ hasText: "Header doesn't exist" }).first()
  ).toHaveText("Header doesn't exist");
});
