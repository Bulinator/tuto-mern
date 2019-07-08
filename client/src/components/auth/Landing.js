//import liraries
import React, { Component } from 'react';
import { Link } from "react-router-dom";

// create a component
class Landing extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="ui container">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <h4>
                            <b>Build</b> a login/auth app with the{" "}
                            <span style={{ fontFamily: "monospace" }}>MERN</span> stack from scratch.
                        </h4> 
                        <p>
                            Create a (minimal) full-stack app with user authentication via passport and JWTs
                        </p>                                                      
                    </div>
                        
                    <div className="sixteen wide column">
                        <Link
                            to="/register"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="ui primary button"
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            style={{
                                marginLeft: "5px",
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="ui positive button"
                        >
                            Log in
                        </Link>                        
                    </div>                
                </div>
            </div>
        );
    }
}


//make this component available to the app
export default Landing;
