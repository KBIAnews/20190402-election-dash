import React, { Component } from "react";
import * as PropTypes from "prop-types";

export class CandidateBar extends Component {
  render() {
    return (
      <div
        className={`static-bar static-bar-${
          this.props.race.totalVotes !== 0
            ? Math.round(
                (this.props.candidate.votes / this.props.race.totalVotes) * 100
              )
            : 0
        }`}
      >
        {this.props.candidate.name} - {this.props.candidate.votes}
      </div>
    );
  }
}

CandidateBar.propTypes = {
  race: PropTypes.any,
  candidate: PropTypes.any
};
