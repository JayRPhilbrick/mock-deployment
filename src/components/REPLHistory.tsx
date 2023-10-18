import { render } from "react-dom";
import "../styles/main.css";
import { Component } from "react";

interface REPLHistoryProps {
  history: string[][][];
}

// This keeps track of the REPL history: a table of arrays
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((command, index) => (
        <div>
          <Table body={command} />
        </div>
      ))}
    </div>
  );

  // This denotes a table as an input with table row Mapped over each row
  function Table({ body }: { body: string[][] }) {
    return (
      <table style={{ width: 500 }} className="center">
        <tbody>
          {body.map((rowContent, rowID) => (
            <TableRow rowContent={rowContent} />
          ))}
        </tbody>
      </table>
    );
  }

    // This converts each row into a list of table datums
  function TableRow({ rowContent }: { rowContent: string[] }) {
    let row = rowContent;
    return (
      <tr>
        {row.map((val, rowID) => (
          <td key={rowID}>{val}</td>
        ))}
      </tr>
    );
  }
}
