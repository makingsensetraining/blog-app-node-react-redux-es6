import React, {PropTypes} from 'react';
import Griddle from  'griddle-react';

const BlogGriddle = ({posts}) => {

    let exampleMetadata = [
        { "columnName": "id", "displayName": "ID" },
        { "columnName": "title", "displayName": "Title" },
        { "columnName": "content", "displayName": "Content" },
        { "columnName": "author", "displayName": "Author" },
        { "columnName": "publishedDate", "displayName": "Date" }
    ];

    return (
        <Griddle
            useGriddleStyles="false"
            tableClassName="table table-striped"
            showFilter="true"
            results={posts}
            columns={["id", "title", "content", "author", "publishedDate"]}
            columnMetadata={exampleMetadata}
            resultsPerPage="10"
        />
    );
};

BlogGriddle.propTypes = {
    posts: PropTypes.array.isRequired
};

export default BlogGriddle;
