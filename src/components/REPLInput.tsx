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
}

export interface REPLFunction {
  (args: Array<string>): String | String[][];
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
    ["view", mockViewCSV],
    ["search", mockSearchCSV],
    ["mode", changeMode],
  ]);

  function load(args: Array<String>): String {
    let filepath = args[1];
    if (filepath != null) {
      const clone = mockFiles.get(filepath);
      if (clone !== undefined) {
        setData(clone);
      } else {
        return "invalid csv name";
      }
      return "loaded";
    } else {
      return "csv name can't be null";
    }
  }


  function csvToTable(data:String[][]){
    const table = (
    <div>
      <table>
                {/* <thead>
                    <tr>
                        {heading.map((head, headID) => (
                            <th key={headID}>{head}</th>
                        ))}
                    </tr>
                </thead> */}
                <tbody>
                    {data.map((val, key) => (
                        <tr key={key}>
                          <td>{val}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>);
    return table;
  }

  function mockViewCSV(): String[][] {
    //args should be empty?
    if (data.length == 0) {
      //show error
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

  const [mode, setMode] = useState<string>("brief");
  const [commandString, setCommandString] = useState<string>("");

  function changeMode(): String {
    let modeToSet;
    if (mode == "brief") {
      modeToSet = "verbose";
    } else {
      modeToSet = "brief";
    }
    setMode(modeToSet);
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
    let toAdd:historyObject = {
      command: commandString,
      result:replout
    }
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
