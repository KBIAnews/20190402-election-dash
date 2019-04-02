import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  GoogleSheetsContextConsumer,
  GoogleSheetsContextProvider
} from "./components/services/GoogleSheetsContext";
import GoogleSheetsFetcher from "./components/services/GoogleSheetsFetcher";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleSheetsContextProvider>
          <GoogleSheetsFetcher
            sheetURL={
              "https://docs.google.com/spreadsheets/d/1Z6zn8Tnwne3CgJh3vHnpRa4gHtKGvPHQeIx6bH0D5xU/"
            }
          />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
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
          <GoogleSheetsContextConsumer>
            {context => (<>{
                !context.pageMustSuspend && (
                    <>
                    {context.getRaces().map(race => (
                        <div className="race" key={race.slug}>
                          <p>{race.name}</p>
                          <pre style={{wordWrap: "break-word",whiteSpace: "pre-wrap"}}>{JSON.stringify(race)}</pre>
                        </div>
                    ))}
                    </>
                )
            }</>)}
          </GoogleSheetsContextConsumer>
        </GoogleSheetsContextProvider>
      </div>
    );
  }
}

export default App;
