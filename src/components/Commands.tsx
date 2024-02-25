import { mock } from "node:test";
import { midMock, smallMock } from "./mockedJson";
import { Dispatch, SetStateAction, useState } from "react";
import { ModeType } from "./REPLHistory";

/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

export const command_map = new Map<String, REPLFunction>([
  ["load", mockLoadCSV],
  ["view", mockViewCSV],
  ["search", mockSearchCSV],
  ["mode", changeMode],
]);

export const [mode, setMode] = useState<ModeType>(ModeType.brief);
const [data, setData] = useState<String[][]>([[]]);

let mockFiles = new Map<String, String[][]>([
  ["smallCensus.csv", smallMock.data],
  ["stardata.csv", midMock.data],
]);

export function mockLoadCSV(args: Array<String>): String {
  let filepath = args[0];
  if (filepath != null) {
    const clone = mockFiles.get(filepath);
    if (clone !== undefined) {
      setData(clone);
    }
    return "loaded";
  } else {
    return "invalid";
  }
}

export function mockViewCSV(): String[][] {
  //args should be empty?
  if (data.length == 0) {
    //show error
  }
  return data;
}

export function mockSearchCSV(args: Array<string>): String[][] {
  const exampleCSV1 = [
    ["1", "2", "3", "4", "5"],
    ["The", "song", "remains", "the", "same."],
  ];
  return exampleCSV1;
}

export function changeMode(args: Array<String>): String {
  let modeToSet;
  if (mode == ModeType.brief) {
    modeToSet = ModeType.verbose;
  } else {
    modeToSet = ModeType.brief;
  }
  setMode(modeToSet);
  return "Mode: " + modeToSet;
}
