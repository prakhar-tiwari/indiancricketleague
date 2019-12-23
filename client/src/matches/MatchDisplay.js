import React, { Fragment, useState, useEffect } from 'react';
import Matches from './Matches';
import './MatchDisplay.css';
import Pagination from '../common/Pagination';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { getMatchData, getMatchDataByYear, getMatchDataByTeamName } from '../actions/matchActions';
import axios from 'axios';

export function MatchDisplay(props) {
    const [teamNames, setTeamNames] = useState([]);
    const {loading} = props.match || props;
    useEffect(() => {
        props.getMatchData(1);
        axios.get('http://localhost:5000/getteamnames')
            .then(res => {
                setTeamNames(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const handleChangeYear = (value) => {
        props.getMatchDataByYear(1, value);
    }

    const handleChangeName = (name) => {
        props.getMatchDataByTeamName(1,name)
    }

    return (
        <div>
            {(!loading) ?
                <Fragment>
                    <section className="match-details-section">
                        <div className="container">
                            <div className="row top-items">
                                <div className="col-md-6 col-sm-12 col-lg-6 filterbyteam">
                                    <select className="browser-default custom-select" onChange={(e) => handleChangeName(e.target.value)} name="selectname" id="selectname">
                                        <option selected disabled>Select Team Name</option>
                                        {(teamNames) ?
                                            teamNames.map((team, index) => (
                                                <option key={index} value={team._id.teamName}>{team._id.teamName}</option>
                                            )) :
                                            null}
                                    </select>
                                </div>
                                <div className="col-md-6 col-sm-12 col-lg-6 filterbyyear">
                                    <select className="browser-default custom-select" onChange={(e) => handleChangeYear(e.target.value)} name="selectyear" id="selectyear">
                                        <option selected disabled>Select Year</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                    </select>
                                </div>
                            </div>
                            <div id='matches' className="row" style={{ marginTop: '50px' }}>
                                <div className="col-md-12 col-lg-12">
                                    <Matches />
                                </div>
                            </div>
                            <div id='pagination' className="row" style={{ marginTop: '50px' }}>
                                <div className="col-md-12 col-lg-12">
                                    <Pagination />
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment> :
                <Loader />}
        </div>
    )
}

const mapStateToProps = state => ({
    match: state.match
})

export default connect(mapStateToProps, { getMatchData, getMatchDataByYear, getMatchDataByTeamName })(MatchDisplay);
