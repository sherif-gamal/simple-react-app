import React from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

const LoadingSection = ({ active, children }) => (
  <Segment>
    <Dimmer active={active} inverted>
      <Loader inverted content="Loading" />
    </Dimmer>
    {children}
  </Segment>
);

export default LoadingSection;
