import { SetStateAction } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: string[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) => (
        <p>
          {command}, {index}
        </p>
      ))}
    </div>
  );
}
