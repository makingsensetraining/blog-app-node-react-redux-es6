import React, {PropTypes} from 'react';
import {Cell} from 'fixed-data-table';

class MyTextCell extends React.Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
}

MyTextCell.propTypes = {
    rowIndex: PropTypes.number,
    field: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
};

export default MyTextCell;

