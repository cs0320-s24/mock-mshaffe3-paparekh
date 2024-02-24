import { mock } from "node:test";
import { midMock, smallMock } from "./mockedJson";
import { Dispatch, SetStateAction, useState } from "react";

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

const [data, setData] = useState<String[][]>([[]]);

let mockFiles = new Map<String, String[][]>([
  ["smallCensus.csv", smallMock.data],
  ["stardata.csv", midMock.data],
]);

// TODO: FIX
export function mockLoadCSV(filepath: string): String {
  if (filepath != null) {
    if (mockFiles.get(filepath) !== undefined) {
      let clone = mockFiles.get("stardata.csv").slice(); //how to avoid undefined error?
      setData(clone);
    }
    return "loaded";
  } else {
    return "invalid";
  }
}

export function mockViewCSV(): String[][] {
  //args should be empty?
  if(data.length==0){
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
