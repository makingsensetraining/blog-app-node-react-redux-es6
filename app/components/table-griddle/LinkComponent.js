import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class LinkComponent extends React.Component {
    render() {
        const {rowData, data} = this.props;
        let url = rowData.link;
        return (
            <Link to={url}>{data}</Link>
        );
    }
}

LinkComponent.propTypes = {
    rowData: PropTypes.object.isRequired,
    data: PropTypes.string.isRequired
};

export default LinkComponent;
