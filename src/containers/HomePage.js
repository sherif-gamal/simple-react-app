import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResourceCard from "../components/ResourceCard";
import { FETCH_CHANNELS } from "../constants";

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchChannels();
  }

  render() {
    return (
      <main className="ui one column stackable aligned page grid">
        <div className="ui grid centered" style={{ fontSize: "1.3em", color: "red" }}>
          <h2>Your one-stop parent resource system</h2>
          <p>
            Discover the best parent resources in one place that are expert
            verified, parent rated, and tailored to you - saving you time and
            effort on your parenting journey.
          </p>
          <br />
          <p>
            Our system curates customized, easy-to-navigate collections of
            resources to fit your specific needs, when it matters most. It
            learns what to send and what to remind you about, so you can spend
            more time enjoying parenthood, feeling prepared and supported along
            the way.
          </p>
        </div>
        {this.props.channels.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </main>
    );
  }
}

HomePage.propTypes = {
  fetchChannels: PropTypes.func.isRequired,
  channels: PropTypes.Array
};

HomePage.defaultProps = {
  channels: []
};

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => {
    dispatch({ type: FETCH_CHANNELS });
  }
});

const mapStateToProps = state => ({
  resources: state.resources
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
