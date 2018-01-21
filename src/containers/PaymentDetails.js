import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PaymentDetails extends PureComponent {}

const mapDispatchToProps = dispatch => ({
  addCard: payload => dispatch({ type: ADD_CARD, payload });
});

PaymentDetails.propTypes = {
  addCard: PropTypes.
}
export default connect()(PaymentDetails);
