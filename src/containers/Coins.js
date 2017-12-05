import React, { PureComponent } from "react";
import { Table, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FETCH_COINS } from "../constants";
import Checkout from "./Checkout";

class Coins extends PureComponent {
  state = {};
  componentWillMount() {
    this.props.loadCoins();
  }

  openModal = coin => {
    this.setState({ modalOpen: true, coin });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { coins } = this.props;
    const { modalOpen } = this.state;
    return (
      <main>
        <Table celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Coin</Table.HeaderCell>
              <Table.HeaderCell>Price (Aud)</Table.HeaderCell>
              <Table.HeaderCell>Market Cap (Aud)</Table.HeaderCell>
              <Table.HeaderCell>Buy</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {coins.map(coin => (
              <Table.Row key={coin.id}>
                <Table.Cell>
                  {coin.name}({coin.symbol})
                </Table.Cell>
                <Table.Cell>
                  ${coin.price_aud.toLocaleString("AU", { currency: "AUD" })}
                </Table.Cell>
                <Table.Cell>
                  ${coin.market_cap_aud.toLocaleString("AU", {
                    currency: "AUD"
                  })}
                </Table.Cell>
                <Table.Cell>
                  <Link to="#" onClick={() => this.openModal(coin)}>
                    Buy
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Checkout
          open={modalOpen}
          close={this.closeModal}
          coin={this.state.coin}
        />
      </main>
    );
  }
}

Coins.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.object),
  loadCoins: PropTypes.func.isRequired
};

Coins.defaultProps = {
  coins: []
};
const mapDispatchToProps = dispatch => ({
  loadCoins: () => dispatch({ type: FETCH_COINS })
});
const mapStateToProps = state => ({
  coins: state.coins
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
