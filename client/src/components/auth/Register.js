import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions';
import classnames from 'classnames';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // if logged in and user navigates to register page, should redirect to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    /**
     * Update state according to 
     * input id received
     * 
     */
    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    onSubmit = event => {
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        // dev debbug
        console.log('Register user:', newUser);
        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (            
            <form className="ui form" noValidate onSubmit={this.onSubmit}>
                <h4 className="ui header">
                    <i className="user icon"></i>
                    <div className="content">
                        Register
                        <div className="sub header">
                            Already have an account? <Link to="/login">Log in</Link>
                        </div>
                    </div>
                </h4>
                
                <div style={{ marginTop: "20px" }}>
                    <div className="field">
                        <label htmlFor="name">Username</label>
                        <span className="red">{errors.name}</span>
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="name"
                            className={classnames("", { invalid: errors.name })}
                        />
                    </div>                    
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <span className="red">{errors.email}</span>
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", { invalid: errors.email })}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <span className="red">{errors.password}</span>
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", { invalid: errors.password })}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="password2">Confirm your password</label>
                        <span className="red">{errors.password2}</span>
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", { invalid: errors.password2 })}
                        />
                    </div>

                    <button                            
                        style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="ui teal button"
                        type="submit"
                        >
                            Log in
                    </button>                                                          
                </div>
            </form>            
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({    
    auth: state.auth,
    errors: state.errors    
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));