import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class ActionsComponent extends React.Component {

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
                <a href="#" onClick={this.props.metadata.deleteCallback.bind(null, this.props.rowData)}>
                    <i className="glyphicon glyphicon-trash"/>
                </a>
            </div>
        );
    }
}

ActionsComponent.propTypes = {
    rowData: PropTypes.object.isRequired
};

export default ActionsComponent;
