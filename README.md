# Project Details

The mock project had a real estate appraiser stakeholder who wanted a front-end application that allowed them to pass in a file path and enter various commands such as switching the modes, "load" a valid CSV file, "view" the CSV is a properly formatted table, and "search <column> <row>" in order to find a particular item in the CSV.

Team members: Priyam Parekh (CS login: paparekh) and Marissa Shaffer (CS login: mshaffe3)

Total estimated time: 15-16 hours

Github repo link: https://github.com/cs0320-s24/mock-mshaffe3-paparekh/commits/main/

# Design Choices

With respect to interfaces, we use the REPLInputProps interface which was created in REPLInput.tsx. This allows us to describe the properties passed in to REPLInput/the shared states between the mode and history. For instance, it includes history, setHistory, mode, and setMode. The REPLInputProps interface is then used in the REPLInput function which handles the various commands such as load, view, search, etc; essentially, the interface provides the necessary data for the REPL functionality. Furthermore, in REPLInput.tsx, we created a interface for the query that holds the value and identifier (both as strings). The query allows for different cases such as being empty, badIndex, badHeader, successIndex, etc. In ControlledInput.tsx, we also use another interface called ControlledInputProps which is then used by the ControlledInput function to manage the states in React. Our REPLHistory.tsx also contained a REPLHistoryProps and historyObject interface for creating a HTML table representing a CSV data in a readable format.

In terms of data structures, we used several Maps to store the CSV information. For example, we created a String -> String[][] Map that held the mockFiles (censusdata.csv, stardata.csv, and noHeaders.csv). We also created a command_map, mapping a String to a REPLFunction—which corresponded to the REPL commands (load, view, search, and mode). The REPL functions also allowed us to fulfill user story 6 and made extensibility more effective for developer stakeholders. Lastly, another Map was used for query -> String[][] for storing the various mock searches. Maps helped us tremendously with effectively storing and retrieving information such as commands and the CSV functionalities.

# Errors/Bugs

After extensively testing the program (both manually and with the Playwright tests), we have found no bugs. Furthermore, there are no checkstyle errors as well.

# Tests

Because the Mock project was concerned with creating front-end components, Playwright tests were used to test the functionality of the program. The test suite checks for not only basic functionality (load, view, and search commands), but also edge cases and the error handling within the program. The following aspects of the program were tested:

- a login button is visible on page load
- input boxes are not visible until login
- input box text changes after typing
- view functionality for stardata.csv
- view functionality for censusdata.csv
- view functionality for noHeaders.csv
- valid search commands for multiple CSV files/loading files concurrently
- mode switching to verbose/brief
- types of invalid inputs/commands for search, load, etc.

For all the tests, various formatted CSVs were used: stardata.csv, censusdata.csv, noHeaders.csv.
Additionally, we did not create unit tests due to the nature of the Mock project, which was not designed to be unit testable. Our focus was primarily on developing the front-end, and thus, utilized Playwright tests.

# How to

Run the tests:
Based on the way that the Playright tests are configured, in order to run individual tests, the developer can press the green run button on the left of each test.

In order to run all the tests located within tests/e2e, the developer can type "npm run test:e2e" in the terminal. This will run all of the tests for the Mock program.

Build/run the program:

1. First, it is essential to save using (CMD-S) before running the Mock program.
2. Type "npm start" to run the program and click on the localhost link.
3. After the localhost opens, click Login.
4. Now, the user can enter the following commands
   - mode: to switch between verbose or brief modes
   - load <csv file>: to load a particular CSV
     - ("stardata.csv", "censusdata.csv", and "noHeaders.csv") are valid options for this mocked project
   - view: to view a CSV file in a formatted table. If no CSV is loaded, it should display an error message response.
   - search <column> <value>: to search for a <value> item in the <column> specified. <column> can be a numerical index or a column header name.
     - You can also input just a value without an identifier.
     - If no CSV is loaded, it should display an error message response
5. After enter a command, click Submit to input the command in the REPL.

# Collaboration

Besides attending collab section and conceptual hours, no outside collaboration was conducted.
