import React from "react";
import { Message } from "semantic-ui-react";

const AccountCreated = props => (
  <main style={{ textAlign: "center" }}>
    <Message success size="big">
      <Message.Header>Account created successfully</Message.Header>
      We sent you an email with a confirmation link, please click that link to
      verify your email address. then click{" "}
      <a href="/login" className="dark">
        here
      </a>{" "}
      to login
    </Message>
  </main>
);

export default AccountCreated;
