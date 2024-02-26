import { SetStateAction, useState, Dispatch } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: Array<historyObject>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
export interface historyObject {
  command: String;
  result: String | String[][];
}

// function buildTable(data: String[][]): HTMLObjectElement {
//   //TODO: turn data into HTML table here!
// }

export function REPLHistory(props: REPLHistoryProps) {
  if (props.mode == "verbose") {
    return (
      <div className="repl-history">
        {props.history.map((output) => (
          <p>
            Command: {output.command}
            Output: {output.result}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div className="repl-history">
        {props.history.map((output) => (
          <p>{output.result}</p>
        ))}
      </div>
    );
    //just print the history of command results
  }
}
