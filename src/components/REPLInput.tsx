import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { historyObject } from "./REPLHistory";
//import { mockLoadCSV, mockSearchCSV,mockViewCSV, REPLFunction } from "./Commands";
import { midMock, smallMock } from "./mockedJson";
import { table } from "console";

interface REPLInputProps {
  history: Array<historyObject>;
  setHistory: Dispatch<SetStateAction<Array<historyObject>>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export interface REPLFunction {
  (args: Array<string>): String[][] | string;
}
const mockFiles = new Map<String, String[][]>([
  ["smallCensus.csv", smallMock.data],
  ["stardata.csv", midMock.data],
]);

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  const [data, setData] = useState<String[][]>([[]]);
  const command_map = new Map<String, REPLFunction>([
    ["load", load],
    ["view", view],
    ["search", mockSearchCSV],
    ["mode", changeMode],
  ]);

  function load(args: Array<String>): string {
    let filepath = args[1];
    if (filepath != null) {
      const clone = mockFiles.get(filepath);
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

  function csvToTable(data: String[][]): JSX.Element {
    const table = (
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

  function view(): String[][] {
    //args should be empty?
    if (data.length == 0) {
      return [["No CSV data"]];
    }
    return data;
  }

  function mockSearchCSV(args: Array<string>): String[][] {
    const exampleCSV1 = [
      ["1", "2", "3", "4", "5"],
      ["The", "song", "remains", "the", "same."],
    ];
    return exampleCSV1;
  }
  const [commandString, setCommandString] = useState<string>("");

  function changeMode(): string {
    let modeToSet;
    if (props.mode == "brief") {
      modeToSet = "verbose";
    } else {
      modeToSet = "brief";
    }
    props.setMode(modeToSet);
    return "Mode: " + modeToSet;
  }

  function handleSubmit() {
    let args = commandString.split(" ");
    let replout;
    let replFuntion = command_map.get(args[0]);
    if (replFuntion == undefined) {
      replout = "Bad command.";
    } else {
      replout = replFuntion(args);
    }
    if (replout instanceof Array) {
      replout = csvToTable(replout);
    }
    let toAdd: historyObject = {
      command: commandString,
      result: replout,
    };
    props.setHistory([...props.history, toAdd]);
    setCommandString("");
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
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
