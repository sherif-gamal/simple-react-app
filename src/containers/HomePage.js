import React, { Component } from "react";
import { connect } from "react-redux";
import ResourceCard from '../components/ResourceCard';
import { FETCH_RESOURCE, FETCH_RESOURCES } from "../constants";

class HomePage extends Component {
  componentWillMount() {
    this.props.fetchResources();
  }

  render() {
    return (
      <main className="ui one column stackable aligned page grid">
        {this.props.resources.map &&
          this.props.resources.map(resource => (
            <ResourceCard key={resource.id} resource={resource}/>
          ))}
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchResource: id => {
    dispatch({ type: FETCH_RESOURCES, payload: id });
  },
  fetchResources: () => {
    dispatch({ type: FETCH_RESOURCES });
  }
});

const mapStateToProps = state => ({
  resources: state.resources
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
