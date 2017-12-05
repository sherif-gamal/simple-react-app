import React, { PureComponent } from "react";
import { Table, Icon } from "semantic-ui-react";

class Wallets extends PureComponent {
  render() {
    return (
      <main>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Coin</Table.HeaderCell>
              <Table.HeaderCell>Buy Rate</Table.HeaderCell>
              <Table.HeaderCell>Sell Rate</Table.HeaderCell>
              <Table.HeaderCell>24hr Change</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>No Name Specified</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row error>
              <Table.Cell>Jimmy</Table.Cell>
              <Table.Cell>Cannot pull data</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell error>
                <Icon name="attention" />
                Classified
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jill</Table.Cell>
              <Table.Cell>Approved</Table.Cell>
              <Table.Cell>None</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </main>
    );
  }
}

export default Wallets;
