import { useState } from "react";
import "../styles/main.css";
import { REPLHistory, historyObject } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * This component stores the shared states and creates the history and input components
 * @returns
 */
export default function REPL() {
  const [history, setHistory] = useState<Array<historyObject>>([]);
  const [mode, setMode] = useState<string>("brief");
  return (
    <div className="repl">
      <REPLHistory history={history} mode={mode} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}
