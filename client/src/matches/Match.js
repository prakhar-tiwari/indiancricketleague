import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Match.css';

function Match(props) {
    const { match,theme } = props;
    return (
        <Fragment>
            <div className={`row match-card-details ${theme}`}>
                <div className={`col-lg-6 col-md-6 col-sm-6 col-6 match-time`}>
                    <span className={theme}><p>{match.date}</p></span>
                </div>
                <div className={`col-lg-6 col-md-6 col-sm-6 col-6 stadium`}>
                    <span className={theme}><p>{match.venue}</p></span>
                </div>
            </div>
            <div className={`row match-card-details ${theme}`}>
                <div className={`col-lg-12 col-md-12 col-sm-12 match-teams ${theme}`}>{match.team1} vs {match.team2}</div>
            </div>
            <div className={`row match-card-details ${theme}`}>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 allcolumns team-logo team-1">
                    <img src={`/images/logos/${match.team1Initials.split(" ").join("").toLowerCase()}-logo.png`} alt={match.team1} />
                    <span className={`match-score`}>
                        <span className={`team-name ${theme}`}>{match.team1Initials}</span>
                        {/* <span className="team-runs">70</span>
                        <span className="team-over">17.1 ov</span> */}
                    </span>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-6 allcolumns team-logo team-2">
                    <span className={`match-score`}>
                        <span className={`team-name ${theme}`}>{match.team2Initials}</span>
                        {/* <span className="team-runs">71/3</span>
                        <span className="team-over">17.4 ov</span> */}
                    </span>
                    <img src={`/images/logos/${match.team2Initials.split(" ").join("").toLowerCase()}-logo.png`} alt={match.team1} />
                </div>
                <div className={`col-lg-3 col-md-12 col-sm-12 col-12 match-info allcolumns`}>
                    <span className={theme}><p>{match.winData}</p></span>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 col-12 allcolumns match-summary">
                    <Link to={`/matchsummary/${match._id}`} className={`btn btn-success ${theme}`}>Match Summary</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Match
