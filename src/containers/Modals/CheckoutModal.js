import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Step,
  Icon,
  Segment,
  Form,
  Select,
  Button,
  Grid
} from "semantic-ui-react";
import DropIn from "braintree-dropin-react";
import braintree from "braintree-web-drop-in";
import PropTypes from "prop-types";
import LoadingSection from "../../components/LoadingSection";
import { GET_CLIENT_TOKEN, HIDE_MODAL } from "../../constants";
import styles from "../../styles";

class CheckoutModal extends PureComponent {
  static propTypes = {
    coin: PropTypes.shape().isRequired,
    coins: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    getClientToken: PropTypes.func.isRequired,
    checkout: PropTypes.shape().isRequired,
    close: PropTypes.func.isRequired
  };
  state = { activeStep: "cart", step: "cart", coin: this.props.coin };

  componentWillMount() {
    this.props.getClientToken();
  }
  setAmount = ({ target: { value } }) => {
    this.setState({ amout: value });
  };

  proceed = () => {
    switch (this.state.activeStep) {
      case "cart":
        this.setState({ activeStep: "payment" });
        break;
      case "payment":
        this.setState({ activeStep: "success" });
        break;
      case "success":
        this.props.close();
        break;
      default:
        break;
    }
  };

  coinOptions = () =>
    this.props.coins.map(coin => ({
      key: coin.id,
      value: coin.id,
      text: `${coin.name}`,
      image: coin.logo
    }));

  render() {
    const { checkout: { clientToken }, close, coins } = this.props;
    const { activeStep, step, amount } = this.state;
    const coin = this.state.coin || coins.find(c => c.id === "bitcoin");
    let component;
    if (!coins || !coin) {
      component = <LoadingSection />;
    } else {
      switch (activeStep) {
        case "cart":
          component = (
            <div>
              <Form>
                <Form.Field>
                  <Select
                    fluid
                    search
                    scrolling
                    defaultValue={coin.id}
                    options={this.coinOptions()}
                    onChange={(e, { value }) =>
                      this.setState({ coin: coins.find(c => c.id === value) })
                    }
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    type="number"
                    placeholder="3.7"
                    onChange={this.setAmount}
                  />
                  <Form.Field>
                    <div
                      style={{
                        textAlign: "center",
                        backgroundColor: styles.themeColor,
                        height: "100%"
                      }}
                    >
                      @ A${coin.price_aud} per {coin.symbol}
                    </div>
                  </Form.Field>
                </Form.Group>
              </Form>
              {amount ? (
                <div style={{ textAlign: "center", color: styles.themeColor }}>
                  <h3>You are bying</h3>
                  <Grid>
                    <Grid.Column>
                      {amount} {coin.name}
                    </Grid.Column>
                  </Grid>
                </div>
              ) : null}
            </div>
          );
          break;
        case "payment":
          component = (
            <form action="/transactions" method="POST">
              <DropIn
                braintree={braintree}
                authorizationToken={clientToken}
                paypal={{ flow: "vault" }}
              />
            </form>
          );
          break;
        case "success":
        default:
          break;
      }
    }
    return (
      <Modal defaultOpen closeIcon onUnmount={close}>
        <Modal.Header>Buy {coin && coin.name}</Modal.Header>
        <Modal.Content>
          <Step.Group style={{ width: "100%" }}>
            <Step
              as="div"
              active={activeStep === "cart"}
              onClick={() => this.setState({ activeStep: "cart" })}
            >
              <Icon name="add to cart" />
              <Step.Content>
                <Step.Title>Go shopping</Step.Title>
                <Step.Description>Enter amount</Step.Description>
              </Step.Content>
            </Step>

            <Step
              as="div"
              active={activeStep === "payment"}
              disabled={step === "cart"}
              onClick={() => this.setState({ activeStep: "payment" })}
            >
              <Icon name="payment" />
              <Step.Content>
                <Step.Title>Pay</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
              </Step.Content>
            </Step>

            <Step
              as="div"
              disabled={step === "cart" || step === "payment"}
              active={activeStep === "success"}
            >
              <Icon name="smile" />
              <Step.Content>
                <Step.Title>Success</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>

          <Segment>{component}</Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.proceed}>
            Proceed <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  checkout: state.checkout,
  coins: state.coins
});
const mapDispatchToProps = dispatch => ({
  getClientToken: () => dispatch({ type: GET_CLIENT_TOKEN }),
  close: () => dispatch({ type: HIDE_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
