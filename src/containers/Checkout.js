import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const ModalModalExample = ({ open, close, coin }) => (
  <Modal open={open} onClose={close}>
    <Modal.Header>Buy {coin && coin.name}</Modal.Header>
    <Modal.Content>
      Buy
      <Modal.Description>
        <Header>lorem</Header>
        <p>lorem Ipsum</p>
        <p>pay</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ModalModalExample;
