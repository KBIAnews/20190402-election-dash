import React, {Component} from "react";
import "./App.css";
import {GoogleSheetsContextConsumer, GoogleSheetsContextProvider} from "./components/services/GoogleSheetsContext";
import GoogleSheetsFetcher from "./components/services/GoogleSheetsFetcher";
import {RaceView} from "./RaceView";

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
          <GoogleSheetsContextConsumer>
            {context => (<>{
                !context.pageMustSuspend && (
                    <>
                    {context.getRaces().map(race => (
                        <RaceView key={race.slug} race={race} />
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
