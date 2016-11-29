import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class ActionsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(){
        this.props.metadata.deleteCallback(this.props.rowData);
    }

    render() {
        const {rowData} = this.props;
        let urlEdit = rowData.linkEdit;

        return (
            <div>
                <Link to={urlEdit}>
                    <i className="glyphicon glyphicon-edit"/>
                </Link>
                &nbsp;
                &nbsp;
                <a href="#" onClick={this.handleOnClick}>
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
