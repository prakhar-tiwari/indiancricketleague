import React, { Fragment, useState, useEffect } from 'react';
import Match from './Match';
import './Matches.css';
import { connect } from 'react-redux';
import { getMatchData } from '../actions/matchActions';
import moment from 'moment';

export function Matches(props) {
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        props.getMatchData(pageNumber);
    }, []);

    const { matches } = props.match;

    const modMatches = (matches) ? matches.map(match => {
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
            winData: winData.toUpperCase(),
            team1Initials,
            team2Initials
        }
    }) : [];
    return (
        <Fragment>
            {
                (modMatches) ? modMatches.map(match =>
                    <div key={match._id} className={`match-details ${props.match.theme}`}>
                        <div className="container">
                            <Match theme={props.match.theme} match={match} />
                        </div>
                    </div>
                ) : null
            }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    match: state.match
})

export default connect(mapStateToProps, { getMatchData })(Matches)
