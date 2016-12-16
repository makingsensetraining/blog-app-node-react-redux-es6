import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';
import Modal from './common/Modal';
import CreatePostModal from './blog-form/CreatePostModal';

function getModal(search) {
    switch (search) {
        case '#test':
            return <Modal title="title" body="Testing Modal"/>;
        case '#post-create':
            return <CreatePostModal />;
        default:
            return null;
    }
}

// This component handles the App template used on every page.
class App extends React.Component {

    render(){
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    {this.props.children}

                    {getModal(this.props.location.hash)}
                </div>
                <hr />
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default connect()(App);
