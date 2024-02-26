import { SetStateAction, useState, Dispatch } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: Array<historyObject>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
export interface historyObject {
  command: String;
  result: string | JSX.Element;
}

// function buildTable(data: String[][]): HTMLObjectElement {
//   //TODO: turn data into HTML table here!
// }

export function REPLHistory(props: REPLHistoryProps) {
  if (props.mode == "verbose") {
    return (
      <div className="repl-history">
        {props.history.map((output, key) => (
          <table>
            <tbody>
              <tr key={key}>
                <td>{"Command: "}</td>
                <td>{output.command}</td>
              </tr>
              <tr key={key}>
                <td>{"Output: "}</td>
                <td>{output.result}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  } else {
    return (
      <div className="repl-history">
        {props.history.map((output) => (
          <table>{output.result}</table>
        ))}
      </div>
    );
    //just print the history of command results
  }
}
