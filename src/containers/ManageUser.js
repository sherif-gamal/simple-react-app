import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ManageUser extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { customer } = this.props;
    return (
      <div>
        <div>
          {customer.firstName} {customer.lastName}
        </div>
        <div>{customer.phone}</div>
        <div>{customer.firstName}</div>
        <div>{customer.firstName}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customer: state.customer
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
