import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import '../auth/Auth.css';
import WinModal from '../WinModal';


class MatchPrediction extends Component {
    constructor() {
        super();
        this.state = {
            firstTeam: '',
            secondTeam: '',
            venue: '',
            battingTeam: '',
            teamNames: [],
            matchVenues: [],
            winningData: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleSubmit = e => {
        e.preventDefault();
        const matchData = {
            firstTeam: this.state.firstTeam,
            secondTeam: this.state.secondTeam,
            venue: this.state.venue,
            battingTeam: this.state.battingTeam
        };

        axios.post('http://localhost:5000/matchprediction', matchData)
            .then(res => {
                this.setState({ winningData: res.data })
            })
            .catch(err => {
                console.log(err);
            });

    }

    componentWillMount() {
        axios.get('http://localhost:5000/getteamnames')
            .then(res => {
                this.setState({ teamNames: res.data });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:5000/getvenuedata')
            .then(res => {
                this.setState({ matchVenues: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="auth-body">
                <div className="auth-container container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="auth-card card">
                            <div className="card-header auth-card-header mx-auto">
                                <h3>Win Prediction</h3>
                            </div>
                            <div className="card-body">
                                <div className="container">
                                    <div className="row mt-2 mb-2">
                                        <div className="col-lg-12">
                                            <select className="browser-default custom-select" onChange={(e) => this.handleChange(e)} name="firstTeam" id="firstteam">
                                                <option selected disabled>Select First Team</option>
                                                {(this.state.teamNames) ?
                                                    this.state.teamNames.map((team, index) => (
                                                        <option key={`${index}-1`} value={team._id.teamName}>{team._id.teamName}</option>
                                                    )) :
                                                    null}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2 mb-2">
                                        <div className="col-lg-12">
                                            <select className="browser-default custom-select" onChange={(e) => this.handleChange(e)} name="secondTeam" id="secondteam">
                                                <option selected disabled>Select Second Team</option>
                                                {(this.state.teamNames) ?
                                                    this.state.teamNames.map((team, index) => (
                                                        <option key={`${index}-2`} value={team._id.teamName}>{team._id.teamName}</option>
                                                    )) :
                                                    null}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mt-2 mb-2">
                                        <div className="col-lg-12">
                                            <select className="browser-default custom-select" onChange={(e) => this.handleChange(e)} name="venue" id="matchvenue">
                                                <option selected disabled>Select Match Venue</option>
                                                {(this.state.matchVenues) ?
                                                    this.state.matchVenues.map((team, index) => (
                                                        <option key={`${index}-3`} value={team._id.venue}>{team._id.venue}</option>
                                                    )) :
                                                    null}
                                            </select>
                                        </div>
                                    </div>
                                    {(this.state.firstTeam && this.state.secondTeam) ? <div className="row mt-2 mb-2">
                                        <div className="col-lg-12">
                                            <select className="browser-default custom-select" onChange={(e) => this.handleChange(e)} name="battingTeam" id="battingteam">
                                                <option selected disabled>Select Team To Bat First</option>
                                                <option value={this.state.firstTeam}>{this.state.firstTeam}</option>
                                                <option value={this.state.secondTeam}>{this.state.secondTeam}</option>
                                            </select>
                                        </div>
                                    </div> : null}
                                    <div className="row mt-2 mb-2" style={{ textAlign: 'center' }}>
                                        <div className="col-lg-12">
                                            <button disabled={(this.state.firstTeam && this.state.secondTeam) ? false : true} style={{ width: '150px' }} onClick={(e) => this.handleSubmit(e)} className="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter">Predict</button>

                                            <WinModal winningData={this.state.winningData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(withRouter(MatchPrediction));
