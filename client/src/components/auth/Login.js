import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions";
import classnames from "classnames";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', errors: {} }
    }

    componentDidMount() {
        // if logged in and user navigates to register page, should redirect to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }    

    // redirect if user is authenticated
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors})
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    onSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        // dev debbug
        console.log('Login user:', userData);
        this.props.loginUser(userData);
    }    

    render() { 
        const { errors } = this.state;

        return ( 
            <div id="wrapper" className="ui middle aligned center aligned grid">
                <div className="column">
                    <form className="ui large form" onSubmit={this.onSubmit}>
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon" />
                                    <input
                                        id="email"
                                        type="text"
                                        name="email"
                                        placeholder="E-mail address"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        className={classnames("", { invalid: errors.email || errors.emailnotfound })}                                        
                                        required
                                    />
                                </div>
                                <span className="ui red header">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>                                
                            </div>

                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon" />
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        className={classnames("", { invalid: errors.password || errors.password })}    
                                        required
                                    />
                                </div>
                                <span className="ui red header">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>                                
                            </div>

                            <button className="ui fluid large teal submit button">LOGIN</button>
                        </div>

                        <div className="ui error message"></div>
                    </form>
                </div>
            </div>
        );
    }
}
 
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);