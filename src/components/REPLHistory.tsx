import { SetStateAction } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
  mode: string;
}

// export enum ModeType {
//   brief,
//   verbose,
// }

export function REPLHistory(props: REPLHistoryProps) {
  if (props.mode == "verbose") {
    return (
      <div className="repl-history">
        {props.history.map((command) => (
          <p>
            Command: {command}
            Output: {}
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
