import React, {PropTypes} from 'react';

class LinkComponent extends React.Component {
    render() {
        const {rowData, data} = this.props;
        let url = rowData.link;
        return (
            <a href={url}>{data}</a>
        );
    }
}

LinkComponent.propTypes = {
    rowData: PropTypes.object.isRequired,
    data: PropTypes.string.isRequired
};

export default LinkComponent;
