import React, {PropTypes} from 'react';
import Griddle from  'griddle-react';

const BlogGriddle = ({posts, useGridStyles, showFilter}) => {

    let columnsMetaData = [
        { "columnName": "id", "displayName": "ID" },
        { "columnName": "title", "displayName": "Title" },
        { "columnName": "content", "displayName": "Content" },
        { "columnName": "author", "displayName": "Author" },
        { "columnName": "publishedDate", "displayName": "Date" }
    ];

    return (
        <Griddle
            useGriddleStyles={useGridStyles}
            tableClassName="table table-striped table-hover"
            showFilter={showFilter}
            results={posts}
            columns={["id", "title", "content", "author", "publishedDate"]}
            columnMetadata={columnsMetaData}
            resultsPerPage="10"
        />
    );
};

BlogGriddle.propTypes = {
    posts: PropTypes.array.isRequired,
    useGridStyles: PropTypes.bool.isRequired,
    showFilter: PropTypes.bool.isRequired
};

export default BlogGriddle;
