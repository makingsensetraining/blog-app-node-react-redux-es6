import React from 'react';
import {Link} from 'react-router';
import Modal from '../common/Modal';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.openModal = this.openModal.bind(this);
    }

    openModal(){
        this.modal.open();
    }

    render(){
        return (
            <div className="jumbotron">
                <h1>Blog App</h1>
                <p>Node, React, Redux and React Router in ES6 for ultra-respositve webapps.</p>
                <Link to="/app/blog-grid" className="btn btn-primary btn-lg">Check the latests posts</Link>

                &nbsp;
                <a href="#" className="btn btn-info btn-lg pull-right" onClick={this.openModal}>Info</a>
                <Modal
                    title="Modal Test"
                    body="This is a testing modal example using bootstrap"
                    ref={(child) => { this.modal = child; }}
                />
            </div>
        );
    }
}

export default HomePage;
