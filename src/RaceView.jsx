import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { CandidateBar } from "./CandidateBar";

export class RaceView extends Component {
  render() {
    const { race } = this.props;
    return (
      <div className="race col-sm-3">
        <h3 className="text-center">{this.props.race.name}</h3>
        {this.props.race.candidates.length > 0 &&
          this.props.race.candidates.map(candidate => (
            <CandidateBar race={race} candidate={candidate} />
          ))}
        {this.props.race.reportedPrecincts} of {this.props.race.totalPrecincts}{" "}
        precincts reporting.
        <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(this.props.race)}
        </pre>
      </div>
    );
  }
}

RaceView.propTypes = {
  race: PropTypes.any
};
