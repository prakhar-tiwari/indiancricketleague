import React, { Component } from "react";
import { connect } from 'react-redux';
import { getMatchData, getMatchDataByYear, getMatchDataByTeamName } from '../actions/matchActions';

export class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            pager: {},
            pageSize: 10,
            currentPage: 0,
            hasNextPage: false,
            hasPreviousPage: false,
            nextPage: 0,
            previousPage: 0,
            lastPage: 0,
            year: '',
            teamName: ''
        };
    }

    componentWillMount() {
        this.updateStates();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.currentPage !== nextProps.match.currentPage) {
            this.updateStates();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.currentPage !== this.props.match.currentPage) {
            this.updateStates();
        }
    }

    updateStates = () => {
        const { currentPage,
            hasNextPage,
            hasPreviousPage,
            nextPage,
            previousPage,
            lastPage,
            year,
            teamName } = this.props.match;


        this.setState({
            currentPage: currentPage,
            nextPage: nextPage,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
            previousPage: previousPage,
            lastPage: lastPage,
            year: year,
            teamName: teamName
        })
    }

    setPage = page => {
        if (this.props.match.year) {
            this.props.getMatchDataByYear(page, this.props.match.year);
        }
        else if (this.props.match.teamName) {
            this.props.getMatchDataByTeamName(page, this.props.match.teamName);
        }
        else {
            this.props.getMatchData(page);
        }
        let pager = this.state.pager;
        if (page < 1) {
            return;
        }
        let startPage, endPage;
        if (this.state.lastPage <= 10) {
            startPage = 1;
            endPage = this.state.lastpage;
        }
        let pages = [];
        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        pager.pages = pages;
        this.setState({ pager: pager });
    }

    render() {
        return (
            <div className="paginator">
                <ul className="pagination" style={{ cursor: "pointer", justifyContent: "center", alignItems: "center" }}>
                    <li className={this.state.currentPage === 1 ? "disabled" : ""}>
                        <a className="btn btn-info" onClick={() => this.setPage(1)}>
                            First
            </a>
                    </li>
                    <li className={this.state.previousPage === 0 ? "disabled" : ""}>
                        <a
                            className="btn btn-primary"
                            onClick={() => this.setPage(this.state.previousPage)}
                        >
                            Prev
            </a>
                    </li>
                    {this.state.pager.pages ? this.state.pager.pages.map(page => (
                        <li className={this.state.pager.currentPage === page ? "active" : 'inactive'}>
                            <a className="btn" onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )) : null}
                    <li
                        className={this.state.currentPage === this.state.lastPage ? "disabled" : ""}
                    >
                        <a
                            className="btn btn-primary"
                            onClick={() => this.setPage(this.state.nextPage)}
                        >
                            Next
            </a>
                    </li>
                    <li
                        className={this.state.currentPage === this.state.lastPage ? "disabled" : ""}
                    >
                        <a
                            className="btn btn-info"
                            onClick={() => this.setPage(this.state.lastPage)}
                        >
                            Last
            </a>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    match: state.match
})

export default connect(mapStateToProps, { getMatchData, getMatchDataByYear, getMatchDataByTeamName })(Pagination);
