import React from 'react';
import './WinModal.css';

function WinModal(props) {
    const { winningData } = props;
    return (
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered winDataModal" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Match Prediction</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {(winningData) ?
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="progress" style={{ width: '100%', height: '30px' }}>
                                            <div id="first-team" name="first-team" className="progress-bar bg-success first-team" style={{ width: `${winningData.firstTeamPercent}%` }}>
                                                {winningData.firstTeamPercent}%
                                            </div>
                                            <div className="progress-bar bg-warning" style={{ width: `${winningData.secondTeamPercent}%` }}>
                                                {winningData.secondTeamPercent}%
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-5 mb-5">
                                    <div className="col-lg-12">
                                        <div className="table table-striped teams-comparison">
                                            <thead>
                                                <tr>
                                                    <th scope='col'>Parameters</th>
                                                    <th scope='col'>First Team</th>
                                                    <th scope='col'>Second Team</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Team Names</td>
                                                    <td>{winningData.firstTeam}</td>
                                                    <td>{winningData.secondTeam}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chasing record</td>
                                                    <td>Chased {winningData.firstTeamChasingHistory} matches</td>
                                                    <td>Chased {winningData.secondTeamChasingHistory} matches</td>
                                                </tr>
                                                <tr>
                                                    <td>Defending record</td>
                                                    <td>Defended {winningData.firstTeamDefendingHistory} matches</td>
                                                    <td>Defended {winningData.secondTeamDefendingHistory} matches</td>
                                                </tr>
                                                <tr>
                                                    <td>Head To Head wins</td>
                                                    <td>{winningData.firstTeamHeadToHeadWins}</td>
                                                    <td>{winningData.secondTeamHeadToHeadWins}</td>
                                                </tr>
                                                <tr>
                                                    <td>Wins in last 5 matches</td>
                                                    <td>{winningData.firstTeamLastFiveWin}</td>
                                                    <td>{winningData.secondTeamLastFiveWin}</td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="modal-body">
                            <span>No Data To show</span>
                        </div>}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinModal
