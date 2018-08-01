import React from "react";
import { Form, Select } from "semantic-ui-react";
import styles from "../../styles";

const CheckoutForm = (coinOptions, coins, coin) => (
  <Form>
    <Form.Field>
      <Select
        fluid
        search
        scrolling
        defaultValue={coin.id}
        options={coinOptions}
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
);
export default CheckoutForm;
