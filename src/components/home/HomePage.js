import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render(){
        return (
            <div className="jumbotron">
                <h1>Blog App</h1>
                <p>Node, React, Redux and React Router in ES6 for ultra-respositve webapps.</p>
                <Link to="posts" className="btn btn-primary btn-lg">Check the latests posts</Link>
            </div>
        );
    }
}

export default HomePage;
