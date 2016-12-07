import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class LinkComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(){
        this.props.metadata.detailCallback(this.props.rowData.id);
    }

    render() {
        return (
            <a href="#" onClick={this.handleOnClick}>{this.props.data}</a>
        );
    }
}

LinkComponent.propTypes = {
    rowData: PropTypes.object.isRequired,
    data: PropTypes.string.isRequired
};

export default LinkComponent;
