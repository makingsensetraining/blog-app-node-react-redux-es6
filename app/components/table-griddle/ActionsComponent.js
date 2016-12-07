import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class ActionsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
        this.handleOnEditClick = this.handleOnEditClick.bind(this);
    }

    handleOnEditClick(){
        this.props.metadata.editCallback(this.props.rowData.id);
    }

    handleOnDeleteClick(){
        this.props.metadata.deleteCallback(this.props.rowData);
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleOnEditClick}>
                    <i className="glyphicon glyphicon-edit"/>
                </a>
                &nbsp;
                &nbsp;
                <a href="#" onClick={this.handleOnDeleteClick}>
                    <i className="glyphicon glyphicon-trash"/>
                </a>
            </div>
        );
    }
}

ActionsComponent.propTypes = {
    rowData: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired
};

export default ActionsComponent;
