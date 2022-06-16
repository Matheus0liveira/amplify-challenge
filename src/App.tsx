import React from "react";
import logo from "./logo.svg";

import "@aws-amplify/ui/dist/style.css";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Greetings } from "aws-amplify-react";

function App() {
  return (
    <div className="App">
      <Greetings />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, { socialProviders: ["google"] });
