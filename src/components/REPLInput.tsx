import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  filepathToParsedCSVMap,
  filepathToSearchResultsMap,
  parsedCSVToFilepathMap,
} from "../mockedJson";

// This interface contains the history (a list of 2D Arrays)
// and a setHistory function
interface REPLInputProps {
  history: string[][][];
  setHistory: Dispatch<SetStateAction<string[][][]>>;
}

// Class that handles when text input is sent to the server.
export function REPLInput(props: REPLInputProps) {
  let [commandString, setCommandString] = useState<string>("");
  let [mode, setMode] = useState<boolean>(false);
  let [fileLoaded, setFile] = useState<boolean>(false);
  let [hasHeaders, setHasHeaders] = useState<boolean>(false);
  let [filename, setFilename] = useState<string>("");
  let [headers, setHeaders] = useState<string[]>([]);
  let [body, setBody] = useState<string[][]>([]);

  // This function is triggered when the button is clicked to handle whatever
  // command is sent.
  function handleSubmit(commandString: string) {
    let command = commandString.split(" ", 3);
    if (command[0] == "load_file") {
      handleLoad(commandString, command);
    } else if (command[0] == "view") {
      if (hasHeaders) {
        body.unshift(headers);
        view(commandString, body);
      } else {
        view(commandString, body);
      }
    } else if (command[0] == "mode") {
      if (mode) {
        setMode(!mode);
        addOutput(commandString, [["Application has been set to brief mode"]]);
      } else {
        setMode(!mode);
        addOutput(commandString, [
          ["Application has been set to verbose mode"],
        ]);
      }
    } else if (command[0] == "search") {
      search(commandString, command);
    } else {
      addOutput(commandString, [["Command not recognized"]]);
    }
    setCommandString("");
  }

  // This function adds a response to history. If the mode is true the response
  // will be added in verbose output, if false in brief.
  function addOutput(commandString: string, output: string[][]) {
    if (mode) {
      props.setHistory([
        ...props.history,
        [["Command: " + commandString]],
        [["Output: "]],
        output,
      ]);
    } else {
      props.setHistory([...props.history, output]);
    }
  }

  // This function is called when the view command is submitted and accesses
  // a mocked csv file to be shown as the output.
  function view(command: string, output: string[][]) {
    if (fileLoaded) {
      addOutput(commandString, output);
    } else {
      addOutput(commandString, [["There is no file loaded"]]);
    }
  }

  // This function handles mocked search functionality. Checks for if the search
  // parameters leads to one of our projected results. Returns informative errors.
  function search(commandString: string, command: string[]) {
    if((isNaN(parseInt(command[1]))) && hasHeaders === false) {
      addOutput(commandString, [["Cannot search by header name in a file with no headers"]]);
    }
    else {
    let returnedMap = filepathToSearchResultsMap.get(filename);
    if (typeof returnedMap != "undefined") {
      let searchParams = command.slice(1);
      console.log(searchParams);
      addOutput(commandString, [searchParams]);
      console.log(returnedMap);
      let keys = Array.from(returnedMap.keys());
      let correctKeyIndex = undefined;
      for (let i = 0; i < keys.length; i++) {
        let match = true;
        for (let j = 0; j < searchParams.length; j++) {
          match = match && searchParams[j] === keys[i][j];
        }
        if (match) {
          correctKeyIndex = i;
        }
      }
      if (typeof correctKeyIndex === "undefined") {
        addOutput(commandString, [
          ["No result found for given search parameters"],
        ]);
      } else {
        let returnedResult = returnedMap.get(keys[correctKeyIndex]);
        if (typeof returnedResult !== "undefined") {
          addOutput(commandString, [["returnedResult not undefined"]]);
          addOutput(commandString, returnedResult);
        }
      }
    } else {
      addOutput(commandString, [["There is no file loaded"]]);
    }
  }
}

  // This function handles mocked load functionality. Checks for if the
  // file provided leads to one of our projected datasets.
  function handleLoad(commandString: string, command: string[]) {
    setFilename(command[1]);
    if (command[2] === "true") {
      let retrievedBody = filepathToParsedCSVMap.get(command[1]);
      if (retrievedBody) {
        addOutput(commandString, [["successfully loaded file with headers"]]);
        setHeaders(retrievedBody[0]);
        setBody(retrievedBody.slice(1));
        setFile(true);
        setHasHeaders(true);
      } else {
        addOutput(commandString, [["failed to load file: no such filename"]]);
      }
    } else {
      let retrievedBody = filepathToParsedCSVMap.get(command[1]);
      if (retrievedBody) {
        addOutput(commandString, [
          ["successfully loaded file without headers"],
        ]);
        setBody(retrievedBody);
        setFile(true);
        setHasHeaders(false);
      } else {
        addOutput(commandString, [["failed to load file: no such filename"]]);
      }
    }
  }


  return (
    <div className="repl-input">
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
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
