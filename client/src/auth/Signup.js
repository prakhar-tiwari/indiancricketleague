import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { faEnvelopeOpenText, faKey, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import TextFieldGroup from './TextFieldGroup';
import './Auth.css';
import { signUp } from '../actions/authActions';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            contactNumber: '',
            favouriteTeam: null
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    submitForm = e => {
        e.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            contactNumber: this.state.contactNumber
        }
        this.props.signUp(userData,this.props.history);
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
        const { errors } = this.state;
        return (
            <div className="auth-body">
                <div className="auth-container container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="auth-card card">
                            <div className="card-header auth-card-header">
                                <h3>Sign up</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <TextFieldGroup
                                        name="name"
                                        change={this.handleChange}
                                        type="text"
                                        placeholder="Full Name"
                                        faIcon={faEnvelopeOpenText}
                                    />
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
                                    <TextFieldGroup
                                        name="confirmPassword"
                                        change={this.handleChange}
                                        type="password"
                                        placeholder="Confirm Password"
                                        faIcon={faKey}
                                    />
                                    <TextFieldGroup
                                        name="contactNumber"
                                        change={this.handleChange}
                                        type="text"
                                        placeholder="Contact Number"
                                        faIcon={faPhone}
                                    />
                                    <div className="form-group">
                                        <button
                                            onClick={this.submitForm}
                                            type="button"
                                            className="btn float-right login-btn">Signup</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center auth-links">
                                    Already have an account?<Link to="/login">Login</Link>
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

export default connect(mapStateToProps, { signUp })(withRouter(Signup));
