import React, { useEffect, useState } from 'react';
import './MatchSummary.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMatchDataById } from '../actions/matchActions';

function MatchSummary(props) {
    const id = props.match.params.id;
    const [currentMatch, setCurrentMatch] = useState(null);
    const [allMatches, setAllMatches] = useState(null);
    useEffect(() => {
        props.getMatchDataById(id);
    }, []);

    useEffect(() => {
        if (props.matches.match) {
            let { match } = props.matches;
            const parsedDate = moment(new Date(match.date), 'LL').format('LL')
            const teamLost = (match.winner === match.team1) ? match.team2 : match.team1;
            let winData;
            if (match.result === 'tie') {
                winData = 'Match was a tie';
            }
            else {
                let isWinByRuns = (match.win_by_runs > 0) ? true : false;
                winData = (isWinByRuns) ?
                    `${match.winner} won by ${match.win_by_runs} runs` :
                    `${match.winner} beat ${teamLost} by ${match.win_by_wickets} wickets`;
            }
            const team1Initials = match.team1.split(" ").map(name => name[0]).join(" ");
            const team2Initials = match.team2.split(" ").map(name => name[0]).join(" ");
            let modMatch = {
                ...match,
                date: parsedDate,
                winData: winData,
                team1Initials,
                team2Initials
            }
            setCurrentMatch(modMatch);
        }
    }, [props.matches.match]);

    useEffect(() => {
        setAllMatches(props.matches.matches);
    }, [props.matches.matches]);

    const modMatches = (allMatches) ? allMatches.map(match => {
        const parsedDate = moment(new Date(match.date), 'LL').format('LL')
        const teamLost = (match.winner === match.team1) ? match.team2 : match.team1;
        let winData;
        if (match.result === 'tie') {
            winData = 'Match was a tie';
        }
        else {
            let isWinByRuns = (match.win_by_runs > 0) ? true : false;
            winData = (isWinByRuns) ?
                `${match.winner} won by ${match.win_by_runs} runs` :
                `${match.winner} beat ${teamLost} by ${match.win_by_wickets} wickets`;
        }
        const team1Initials = match.team1.split(" ").map(name => name[0]).join(" ");
        const team2Initials = match.team2.split(" ").map(name => name[0]).join(" ");
        return {
            ...match,
            date: parsedDate,
            winData: winData,
            team1Initials,
            team2Initials
        }
    }) : null;

    let match;
    if (currentMatch) {
        match = currentMatch
    }
    else {
        match = (modMatches) ? modMatches.find(mat => mat._id === id) : null;
    }

    return (
        <div>
            {(match) ? <div className="match-summary">
                <div className="match-info">
                    <div className="match-bg"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12 header-data">
                                <img className="team1" src={`/images/logos/${match.team1Initials.split(" ").join("").toLowerCase()}-logo.png`} alt="" />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12 header-data">
                                <h4>{match.winData}</h4>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12 header-data">
                                <img className="team2" src={`/images/logos/${match.team2Initials.split(" ").join("").toLowerCase()}-logo.png`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="match-details">
                    <div className="container">
                        <div className="row match-details-info">
                            <div className="col-lg-12">
                                <div className="list-type5">
                                    <ul>
                                        <li><span className="title">Match Winner</span><a href="#">{match.winner}</a></li>
                                        <li><span className="title">Toss Winner</span><a href="#">{match.toss_winner}</a></li>
                                        <li><span className="title">Man of the match</span><a href="#">{match.player_of_match}</a></li>
                                        <li><span className="title">Result</span><a href="#">{match.winData}</a></li>
                                        <li><span className="title">First Umpire</span><a href="#">{match.umpire1}</a></li>
                                        <li><span className="title">Leg Umpire</span><a href="#">{match.umpire2}</a></li>
                                        <li><span className="title">Date</span><a href="#">{match.date}</a></li>
                                        <li><span className="title">City</span><a href="#">{match.city}</a></li>
                                        <li><span className="title">Venue</span><a href="#">{match.venue}</a></li>
                                    </ul>
                                </div>
                                {/* <div className="list-group-flush match-detail-info">
                                <div className="list-group-item">
                                    <h5 className="mb-0">Winner <FontAwesomeIcon icon={faArrowRight} /> {match.winner}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">Toss Decision <FontAwesomeIcon icon={faArrowRight} /> {match.toss_winner} chose to {match.toss_decision}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">Man of the match <FontAwesomeIcon icon={faArrowRight} /> {match.player_of_match}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">Result <FontAwesomeIcon icon={faArrowRight} /> {match.winData}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">First Umpire <FontAwesomeIcon icon={faArrowRight} /> {match.umpire1}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">Leg Umpire <FontAwesomeIcon icon={faArrowRight} /> {match.umpire2}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">Date <FontAwesomeIcon icon={faArrowRight} /> {match.date}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">City <FontAwesomeIcon icon={faArrowRight} /> {match.city}</h5>
                                </div>
                                <div className="list-group-item">
                                    <h5 className="mb-0">Venue <FontAwesomeIcon icon={faArrowRight} /> {match.venue}</h5>
                                </div> 
                            </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    matches: state.match
})

export default connect(mapStateToProps, { getMatchDataById })(MatchSummary)
