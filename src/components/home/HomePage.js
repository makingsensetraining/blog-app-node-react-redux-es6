import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render(){
        return (
            <div className="jumbotron">
                <h1>ToDo's App</h1>
                <p>Node, React, Redux and React Router in ES6 for ultra-respositve webapps.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more about the project</Link>
            </div>
        );
    }
}

export default HomePage;
