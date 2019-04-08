import React, { Component } from "react";
import "./App.css";
import {
  GoogleSheetsContextConsumer,
  GoogleSheetsContextProvider
} from "./components/services/GoogleSheetsContext";
import GoogleSheetsFetcher from "./components/services/GoogleSheetsFetcher";
import { RaceView } from "./RaceView";

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
            {context => (
              <>
                {!context.pageMustSuspend && (
                  <>
                    <h1 className={"text-center"}>
                      {context.getLabel("headline")}
                    </h1>
                    <div className="reported">
                      Last Updated {context.getLabel("last_updated")}.
                    </div>

                    <div className="race-stack">
                      {context
                        .getRaces()
                        .filter(el => el.priority)
                        .map(race => (
                          <RaceView key={race.slug} race={race} />
                        ))}
                    </div>

                    {context.showAllRaces && (
                      <div className="race-stack">
                        {context
                          .getRaces()
                          .filter(el => !el.priority)
                          .map(race => (
                            <RaceView key={race.slug} race={race} />
                          ))}
                      </div>
                    )}

                    <div style={{
                        display:"grid",
                        maxWidth:"250px",
                        margin:"15px auto"
                    }}>

                    <button
                      type="button"
                      className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full"
                      onClick={context.toggleShowAllRaces}
                    >
                      Show {context.showAllRaces ? "Fewer":"All"} Races
                    </button></div>
                  </>
                )}
              </>
            )}
          </GoogleSheetsContextConsumer>
        </GoogleSheetsContextProvider>
      </div>
    );
  }
}

export default App;
