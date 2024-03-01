import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

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

test("load command creates an empty result (invalid file)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load invaliddata.csv");
  await expect(page.getByLabel("Command input")).toHaveValue(
    "load invaliddata.csv"
  );
  // Testing search with ProperName heading
  await page.getByLabel("Submit").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  const table = page.locator('div[className="repl-history"] table');
  const rows = table.locator("tbody tr");
  // await expect(rows).toHaveCount(0);
  // await expect(rows.nth(0).locator("td").nth(0)).toHaveText(
  //   "No such filename found"
  // );
  const output = await page
    .locator('div[className="repl-history"] table')
    .innerText();
  expect(output).toBe("");
  // table className="history-table"
});

// TODO change
test("basic search functionality for stardata.csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load stardata.csv");
  await expect(page.getByLabel("Command input")).toHaveValue(
    "load stardata.csv"
  );
  // Testing search with ProperName heading
  await page.getByLabel("Submit").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  const table = page.locator('div[className="repl-history"] table');
  const rows = table.locator("tbody tr");
  // TODO Look
  await expect(rows).toHaveCount(0);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search ProperName Lynn");
  await page.getByLabel("Submit").click();
  const table_2 = page.locator('div[aria-label="search-table"] table');
  const rows_2 = table.locator("tbody tr");
  // TODO Look
  // await expect(rows_2).toHaveCount(1);

  // await expect(rows.nth(0).locator("td").nth(0)).toHaveText("");
  // const basic_propername_search_output =
  //   '"5", "Zita", "264.58918", "0.04601", "-226.71007"';
  // await expect(page.getByLabel("Command input")).toHaveValue(
  //   basic_propername_search_output
  // );

  // // Testing search with X heading
  // await page.getByLabel("Command input").fill("search X 0");
  // await page.getByLabel("Command input").click();
  // const basic_x_search_output = '"0", "Sol", "0", "0", "0"';
  // await expect(page.getByLabel("Command input")).toHaveValue(
  //   basic_x_search_output
  // );

  // // Testing search with StarID heading
  // await page.getByLabel("Command input").fill("search StarID 134");
  // await page.getByLabel("Command input").click();
  // const basic_starid_search_output =
  //   '"134", "Koda", "769.05734", "5.70658", "-15.30381"';
  // await expect(page.getByLabel("Command input")).toHaveValue(
  //   basic_starid_search_output
  // );

  // // Testing search with Z heading
  // await page.getByLabel("Command input").fill("search Z -300.85302");
  // await page.getByLabel("Command input").click();
  // const basic_z_search_output =
  //   '"132", "Sheron", "435.2293", "3.20568", "-300.85302"';
  // await expect(page.getByLabel("Command input")).toHaveValue(
  //   basic_z_search_output
  // );
});

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
});

test("after I click the button, its label increments", async ({ page }) => {
  // TODO WITH TA: Fill this in to test your button counter functionality!
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
});
