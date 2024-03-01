import { expect, test } from "@playwright/test";

// test.beforeEach(() => {
//   // ... you'd put it here.
//   // TODO: Is there something we need to do before every test case to avoid repeating code?
// });

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

test("on page load, i see a button", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submitted 0 times" })
  ).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submit" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Awesome command");
});

test("basic search functionality for stardata.csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();

  // Testing search with ProperName heading
  await page.getByLabel("Command input").fill("search ProperName Zita");
  await page.getByLabel("Command input").click();
  const basic_propername_search_output =
    '"5", "Zita", "264.58918", "0.04601", "-226.71007"';
  await expect(page.getByLabel("Command input")).toHaveValue(
    basic_propername_search_output
  );

  // Testing search with X heading
  await page.getByLabel("Command input").fill("search X 0");
  await page.getByLabel("Command input").click();
  const basic_x_search_output = '"0", "Sol", "0", "0", "0"';
  await expect(page.getByLabel("Command input")).toHaveValue(
    basic_x_search_output
  );

  // Testing search with StarID heading
  await page.getByLabel("Command input").fill("search StarID 134");
  await page.getByLabel("Command input").click();
  const basic_starid_search_output =
    '"134", "Koda", "769.05734", "5.70658", "-15.30381"';
  await expect(page.getByLabel("Command input")).toHaveValue(
    basic_starid_search_output
  );

  // Testing search with Z heading
  await page.getByLabel("Command input").fill("search Z -300.85302");
  await page.getByLabel("Command input").click();
  const basic_z_search_output =
    '"132", "Sheron", "435.2293", "3.20568", "-300.85302"';
  await expect(page.getByLabel("Command input")).toHaveValue(
    basic_z_search_output
  );
});

test("search functionality for stardata.csv (with invalid/incomplete input)", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();

  // Testing search with invalid row input
  await page.getByLabel("Command input").fill("search ProperName");
  await page.getByLabel("Command input").click();
  // TODO
  // const invalid_propername_search_output = "Invalid search query: no such mock search: " + args";
  // await expect(page.getByLabel("Command input")).toHaveValue(
  //   invalid_propername_search_output
  // );

  // Testing search with invalid column input
});

test("basic search functionality for smallCensus.csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();

  // Testing search with Data Type Heading (Hispanic/Latino)
  await page
    .getByLabel("Command input")
    .fill("search Data Type Hispanic/Latino");
  await page.getByLabel("Command input").click();
  const basic_datatype1_search_output =
    '"RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"';
  await expect(page.getByLabel("Command input")).toHaveValue(
    basic_datatype1_search_output
  );

  // Testing search with Data Type Heading (Multiracial)
  await page.getByLabel("Command input").fill("search Data Type Multiracial");
  await page.getByLabel("Command input").click();
  const basic_datatype2_search_output =
    '"RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"';
  await expect(page.getByLabel("Command input")).toHaveValue(
    basic_datatype2_search_output
  );
});
