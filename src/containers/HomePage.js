import React from "react";
import { Tab } from "semantic-ui-react";
import Coins from "./Coins";
import Wallets from "./Wallets";

const panes = [
  {
    menuItem: "Coins",
    render: () => <Coins />
  },
  {
    menuItem: "Wallets",
    render: () => <Wallets />
  }
];

const HomePage = () => (
  <main>
    <Tab
      className="center aligned grid"
      grid={{ paneWidth: 12, tabWidth: 12 }}
      menu={{ pointing: true, className: "center aligned grid" }}
      panes={panes}
    />
  </main>
);

export default HomePage;
