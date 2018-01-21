import React, { PureComponent } from "react";
import { Table, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FETCH_COINS, SHOW_MODAL } from "../constants";

class Coins extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    userVerified: PropTypes.bool.isRequired,
    startCheckout: PropTypes.func.isRequired
  };
  state = {};
  componentWillMount() {
    this.props.loadCoins();
  }

  openModal = coin => {
    this.setState({ modalOpen: true, coin });
  };

  buy = coin => {
    const { userVerified, history, startCheckout } = this.props;
    if (userVerified) {
      startCheckout(coin);
    } else {
      history.push("/verify");
    }
  };

  sell = coin => {
    const { userVerified, history } = this.props;
    if (userVerified) {
      // do something
    } else {
      history.push("/verify");
    }
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
              <Table.HeaderCell>Buy/Sell</Table.HeaderCell>
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
                  <Link to="#" onClick={() => this.buy(coin)}>
                    Buy
                  </Link>
                  /
                  <Link to="#" onClick={() => this.sell(coin)}>
                    Sell
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
  loadCoins: () => dispatch({ type: FETCH_COINS }),
  startCheckout: data =>
    dispatch({ type: SHOW_MODAL, payload: { name: "checkout", data } })
});
const mapStateToProps = state => ({
  coins: state.coins,
  user: state.user,
  userVerified:
    state.user &&
    state.user.idVerification === "V" &&
    state.user.addressVerification === "V" &&
    state.user.phoneVerification === "V"
});

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
