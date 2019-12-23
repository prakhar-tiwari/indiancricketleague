import React from 'react';
import Theme from './Theme';
import MatchDisplay from './matches/MatchDisplay';
import { connect } from 'react-redux';

function Home(props) {
    const { isAuthenticated } = props.auth;
    return (
        <div className="container">
            {
                (isAuthenticated)?
                <div className="row">
                    <div className="col-md-3 col-lg-3">
                        <Theme />
                    </div>
                    <div className="col-md-9 col-lg-9">
                        <MatchDisplay />
                    </div>
                </div>:
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <MatchDisplay />
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Home)
