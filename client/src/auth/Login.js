import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { faKey, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import TextFieldGroup from './TextFieldGroup';
import './Auth.css';
import { login } from '../actions/authActions';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    submitForm = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(userData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.replace('/');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.replace('/');
        }
    }

    render() {
        return (
            <div className="auth-body">
                <div className="auth-container container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="auth-card card">
                            <div className="card-header auth-card-header">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <TextFieldGroup
                                        name="email"
                                        change={this.handleChange}
                                        type="email"
                                        placeholder="Email"
                                        faIcon={faMailBulk}
                                    />
                                    <TextFieldGroup
                                        name="password"
                                        change={this.handleChange}
                                        type="password"
                                        placeholder="Password"
                                        faIcon={faKey}
                                    />
                                    <div className="form-group">
                                        <button
                                            onClick={this.submitForm}
                                            type="button"
                                            className="btn float-right login-btn">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center auth-links">
                                    Don't have an account?<Link to="/signup">Sign Up</Link>
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

export default connect(mapStateToProps, { login })(withRouter(Login));
