import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { historyObject } from "./REPLHistory";
import {
  badIndex,
  invalidHeader,
  midMock as starMock,
  noHeaders,
  noQuery,
  searchNoHeaders,
  searchSuccessHeader,
  searchSuccessIndex,
  searchSuccessSansIdentify,
  smallMock as censusMock,
} from "./mockedJson";

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
  ["smallCensus.csv", censusMock.data],
  ["stardata.csv", starMock.data],
  ["noHeadersCensus.csv", noHeaders.data],
]);

/**
 * This won't work because hashcode of array... how can we store the query differently?
 */
const mockSearchStars = new Map<String[], String[][]>([
  [[], [[noQuery.failure_reason]]],
  [["Lynn", "85"], [[badIndex.failure_reason]]],
  [["Lynn", "Pizza"], [[invalidHeader.failure_reason]]],
  [["Lynn", "1"], searchSuccessIndex.data],
  [["Lynn", "ProperName"], searchSuccessHeader.data],
  [["Lynn"], searchSuccessSansIdentify.data],
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
    args.shift();
    if (data === starMock.data) {
      const result = mockSearchStars.get(["Lynn"]);
      if (result === undefined) {
        return [["Invalid search query: no such mock search" + args]];
      }
      return result;
    }
    return [["Invalid search query: not correct file"]];
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
