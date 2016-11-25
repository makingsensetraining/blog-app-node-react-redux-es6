import React, {PropTypes} from 'react';
import Griddle from  'griddle-react';
import { BootstrapPager } from 'griddle-react-bootstrap';
import LinkComponent from '../table-griddle/LinkComponent';
import ActionsComponent from '../table-griddle/ActionsComponent';

const BlogGrid = ({data, resultsPerPage, useGridStyles, showFilter, useCustomPagerComponent, deleteCallback}) => {

    let columnsMetaData = [
        { "columnName": "id", "displayName": "ID" },
        { "columnName": "title", "displayName": "Title", "customComponent": LinkComponent },
        { "columnName": "content", "displayName": "Content" },
        { "columnName": "author", "displayName": "Author" },
        { "columnName": "publishedDate", "displayName": "Date" },
        { "columnName":
            "actions",
            "displayName": " ",
            "locked": "true",
            "cssClassName": "grid-actions-column",
            "customComponent": ActionsComponent,
            "deleteCallback": deleteCallback
        }
    ];

    return (
        <Griddle
            useGriddleStyles={useGridStyles}
            tableClassName="table table-striped table-hover"
            showFilter={showFilter}
            results={data}
            columns={["id", "title", "content", "author", "publishedDate", "actions"]}
            columnMetadata={columnsMetaData}
            resultsPerPage={resultsPerPage}
            useCustomPagerComponent={useCustomPagerComponent}
            customPagerComponent={BootstrapPager}
        />
    );
};

BlogGrid.defaultTypes = {
    resultsPerPage: 5,
    useGridStyles: true,
    showFilter: false,
    useCustomPagerComponent: false
};

BlogGrid.propTypes = {
    data: PropTypes.array.isRequired,
    resultsPerPage: PropTypes.number,
    useGridStyles: PropTypes.bool,
    showFilter: PropTypes.bool,
    useCustomPagerComponent: PropTypes.bool
};

export default BlogGrid;
