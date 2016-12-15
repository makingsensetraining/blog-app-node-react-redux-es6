import React from 'react';
import {Link} from 'react-router';

const ModalTest = React.createClass({
    styles: {
        position: 'fixed',
        top: '20%',
        right: '20%',
        bottom: '20%',
        left: '20%',
        padding: 20,
        boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
        overflow: 'auto',
        background: '#fff'
    },

    render() {
        return (
            <div style={this.styles}>
                <p><Link to={this.props.returnTo}>Back</Link></p>
                {this.props.children}
            </div>
        )
    }
});

export default ModalTest;
