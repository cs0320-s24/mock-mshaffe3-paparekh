import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { historyObject } from "./REPLHistory";
import { midMock, smallMock } from "./mockedJson";

/*
 * This interface describes the props passed into REPLInput, which are the shared states of
 * mode and history
 */
interface REPLInputProps {
  history: Array<historyObject>;
  setHistory: Dispatch<SetStateAction<Array<historyObject>>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

/*
 * The REPLFunction interface allows a developer to implement their own commands by creating a
 * new function and adding it to the command_map. It can return
 */
export interface REPLFunction {
  (args: Array<string>): String[][] | string;
}

/*
 * This maps file names to mock JSON files for front-end testing purposes
 */
const mockFiles = new Map<String, String[][]>([
  ["smallCensus.csv", smallMock.data],
  ["stardata.csv", midMock.data],
]);

export function REPLInput(props: REPLInputProps) {
  const [data, setData] = useState<String[][]>([[]]);
  const command_map = new Map<String, REPLFunction>([
    ["load", load],
    ["view", view],
    ["search", search],
    ["mode", changeMode],
  ]);

  /**
   * This REPLFunction handles the "load" command by setting the data variable
   * to be equal to the mocked data
   * @param args the command string arguments
   * @returns Message to be added to REPLHistory
   */
  function load(args: Array<String>): string {
    let filepath = args[1];
    if (filepath != null) {
      //try to use mock file map to get data
      const clone = mockFiles.get(filepath);
      //if no such filename
      if (clone !== undefined) {
        setData(clone);
      } else {
        return "Invalid csv name: " + filepath;
      }
      return "Loaded: " + filepath;
    } else {
      return "CSV name can't be null";
    }
  }

  /**
   * This helper function turns a 2D array into an HTML table for
   * readability of the REPLHistory
   * @param data mocked JSON data to display in HTML table
   * @returns An HTML table to display
   */
  function csvToTable(data: String[][]): JSX.Element {
    let table = (
      <div>
        <table>
          {data.map((val, key) => (
            <tr key={key}>
              {val.map((elt) => (
                <td>{elt}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
    return table;
  }

  /**
   * This REPLFunction handles the "view" command by returning the loaded data
   * @returns A 2D array of the data loaded
   */
  function view(): String[][] {
    //args should be empty?
    if (data.length == 0) {
      return [["No CSV data"]];
    }
    return data;
  }
  
  /**
   * REPLFunction handles the search command, and returns a 2D array of the search results
   * @param args The command string to be parsed and searched through
   * @returns String[][] representing a successful output or informative error * message
   */
  function search(args: Array<string>): String[][] {
    if (data.length === 0) {
      return [["No CSV data loaded."]];
    }

    const columnArg = args.slice(1, -1).join(" ");
    const value = args.slice(args.length - 1).join(" ");

    let columnIndex: number;

    // Determine if the columnArg is an index or a column name
    if (!isNaN(parseInt(columnArg))) {
      columnIndex = parseInt(columnArg);
    } else {
      columnIndex = data[0].indexOf(columnArg);
    }

    if (columnIndex === -1) {
      return [["Column not found. Make sure to enter a valid column!"]];
    }

    const results: String[][] = [data[0]];

    for (let i = 1; i < data.length; i++) {
      if (data[i][columnIndex] === value) {
        results.push(data[i]);
      }
    }

    if (results.length === 1) {
      return [["No matching rows found. Make sure to enter a valid row!"]];
    }

    return results;
  }

  const [commandString, setCommandString] = useState<string>("");

  /**
   * This REPLFunction handles the "mode" command which changes the output state from
   * brief to verbose.
   * @returns A string that says which mode we have just changed to
   */
  function changeMode(): string {
    let modeToSet;
    if (props.mode == "brief") {
      modeToSet = "verbose";
    } else {
      modeToSet = "brief";
    }
    //update the shared state
    props.setMode(modeToSet);
    return "Mode: " + modeToSet;
  }

  /**
   * This function is called when the Submit button is pressed
   */
  function handleSubmit() {
    //commandString is broken into command and parameters
    let args = commandString.split(" ");
    let replout;
    //try to get command function from the map
    let replFuntion = command_map.get(args[0]);
    //if no such command present in the map
    if (replFuntion == undefined) {
      replout = "Bad command.";
    } else {
      //call the REPLFunction with the command string array
      replout = replFuntion(args);
    }
    //Checks whether response needs to be formatted in an HTML table (view and search)
    if (typeof replout != "string") {
      replout = csvToTable(replout);
    }
    //creates new element to add to the history
    let toAdd: historyObject = {
      command: commandString,
      result: replout,
    };
    //update the shared state
    props.setHistory([...props.history, toAdd]);
    //reset the input box
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
