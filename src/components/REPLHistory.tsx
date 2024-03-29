import { SetStateAction, useState, Dispatch } from "react";
import "../styles/main.css";

/**
 * Contains the shared states across the files
 */
interface REPLHistoryProps {
  history: Array<historyObject>;
  mode: string;
}

/**
 * Models a history element, which contains a command string and the output, which
 * is either a string or a HTML table
 */
export interface historyObject {
  command: String;
  result: string | JSX.Element;
}

/**
 * Allows for table generation for both the verbose and brief modes
 * @param props - REPLHistoryProps
 * @returns HTML table
 */
export function REPLHistory(props: REPLHistoryProps) {
  //verbose mode
  if (props.mode == "verbose") {
    return (
      <div className="repl-history">
        {props.history.map((output, key) => (
          <table aria-label="history-table">
            <tbody>
              <tr key={key}>
                <td>{"Command"}</td>
                <td>{output.command}</td>
              </tr>
              <tr key={key}>
                <td>{"Output"}</td>
                <td>{output.result}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  }
  //brief mode
  else {
    return (
      <div className="repl-history">
        {props.history.map((output) => (
          <table className="history-table">{output.result}</table>
        ))}
      </div>
    );
    //just print the history of command results
  }
}
