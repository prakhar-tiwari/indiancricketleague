import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import NavigationItem from './NavigationItem';
import './Navigation.css';

export function Navigation(props) {
    const { isAuthenticated,user } = props.auth || props;
    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top">
                <div className="container">
                    <Link to='/' className="navbar-brand em-text">ICL</Link>
                    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarsEsample009">
                        <ul className="nav navbar-nav mr-auto">
                            <NavigationItem route='/' content='Home' cls="home" />
                            <NavigationItem route='/predict' content='Win Prediction' cls="/prediction" />
                            {(!isAuthenticated) ?
                                <Fragment>
                                    <NavigationItem route='/login' content='Login' cls="login" />
                                    <NavigationItem route='/signup' content='Signup' cls="signup" />
                                </Fragment> :
                                null}
                        </ul>
                    </div>
                    {(isAuthenticated) ?
                        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link about" href="#">Welcome, {user.name}</a>
                                </li>
                                <li id="nav-item-logout" className="nav-item">
                                    <a className="nav-link logout" style={{ cursor: 'pointer' }} onClick={() => props.logout()}>Logout</a>
                                </li>
                            </ul>
                        </div> :
                        null}
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navigation);
