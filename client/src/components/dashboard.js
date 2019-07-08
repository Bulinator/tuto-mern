import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class Dashboard extends Component {
    handleLogout = event => {
        event.preventDefault();
        this.props.logoutUser();
    }
 
    render() { 
        const { user } = this.props.auth;

        return (  
            <div className="row">
                <h1>Dashboard</h1>
                <h4>
                    Hey there, {user.name.split(" ")[0]}                    
                </h4>
                <h5>
                    You are now logged into a full-stack mern
                </h5>
                <button
                    className="ui fluid large teal submit button"
                    onClick={this.handleLogout}
                >
                        LOGOUT
                </button>
            </div>
        );
    }
}
 
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);