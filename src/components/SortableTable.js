import React from "react";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once

// Table data as an array of objects
const list = [
  { name: "Brian Vaughn", description: "Software engineer" }
  // And so on...
];

// Render your table
export default () => (
  <Table
    width={300}
    height={300}
    headerHeight={20}
    rowHeight={30}
    rowCount={list.length}
    rowGetter={({ index }) => list[index]}
  >
    <Column label="Name" dataKey="name" width={100} />
    <Column width={200} label="Description" dataKey="description" />
  </Table>
);
