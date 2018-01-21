import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CheckoutModal from "./CheckoutModal";

class Modals extends Component {
  static propTypes = {
    ui: PropTypes.shape({
      modal: PropTypes.shape({})
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let component = null;
    const modal = this.props.ui.modal;
    if (modal) {
      switch (modal.name) {
        case "checkout":
          component = <CheckoutModal coin={modal.data} />;
          break;
        default:
          component = null;
      }
    }
    return component;
  }
}

const mapStateToProps = state => ({
  ui: state.ui
});

export default connect(mapStateToProps, null)(Modals);
