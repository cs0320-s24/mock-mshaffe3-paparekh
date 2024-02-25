import { SetStateAction, useState } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: Array<historyObject>;
  mode: string;
}
export interface historyObject {
  command: String;
  result: String | String[][]; //| Map<string, HTMLTableElement>;
}

export enum ModeType {
  brief,
  verbose,
}

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
        {/* TODO: To go through all the pushed commands... try the .map() function! */}
      </div>
    );
    //just print the history of command results
  }
}
