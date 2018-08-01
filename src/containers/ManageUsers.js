import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";

const list = [
  { name: "Brian Vaughn", description: "Software engineer" }
  // And so on...
];

class MyComponent extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
