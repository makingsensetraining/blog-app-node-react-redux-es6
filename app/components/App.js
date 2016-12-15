import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';


import AutoOpenModal from './common/AutoOpenModal'; //Boron based
import ModalTest from './common/ModalTest'; //Simple CSS based

// This component handles the App template used on every page.
class App extends React.Component {
    constructor(props, context){
        super(props, context);

        //Mapping events
        this.hideModal = this.hideModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // if we changed routes...
        if ((nextProps.location.state &&
             nextProps.location.state.modal)) {
                // save the old children (just like animation)
                this.previousChildren = this.props.children
        }
    }

    hideModal(){
        this.modal.hide();
    }

    render(){
        let { location } = this.props;

        let isModal = (
            location.state &&
            location.state.modal &&
            this.previousChildren
        );

        console.log('isModal: ');
        console.log(isModal);

        console.log('previousChildren: ');
        console.log(this.previousChildren);

        let childrenWithProps;
        if (isModal){
            childrenWithProps = React.Children.map(this.props.children,
                (child) => React.cloneElement(child, {
                    hide: this.hideModal
                })
            );
        }

        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    {/* Renders Page normally if not Modal */}
                    {isModal ?
                        this.previousChildren :
                        this.props.children
                    }

                    {/* Renders a Modal if it's modal */}
                    {isModal && (
                        <AutoOpenModal
                            title={location.state.title}
                            size={location.state.size}
                            ref={(child) => { this.modal = child; }}>
                                {childrenWithProps}
                        </AutoOpenModal>
                    )}
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
