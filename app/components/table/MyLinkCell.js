import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Cell} from 'fixed-data-table';

class MyLinkCell extends React.Component {
    render() {
        const {rowIndex, field, link, data, ...props} = this.props;
        const nameLink = data[rowIndex][field];
        const linkTo = data[rowIndex][link];

        return (
            <Cell {...props}>
                <Link to={linkTo}>{nameLink}</Link>
            </Cell>
        );
    }
}

MyLinkCell.propTypes = {
    rowIndex: PropTypes.number,
    field: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};

export default MyLinkCell;
