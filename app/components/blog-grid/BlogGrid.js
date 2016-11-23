import React, {PropTypes} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import MyTextCell from '../table/MyTextCell';
import MyLinkCell from '../table/MyLinkCell';

const BlogGrid = ({posts}) => {
    return (
        <Table
            rowHeight={50}
            rowsCount={posts.length}
            width={800}
            height={500}
            headerHeight={50}>
            <Column
                header={<Cell>ID</Cell>}
                cell={<MyTextCell data={posts} field="id" />}
                width={50}
                align="center"
            />
            <Column
                header={<Cell>Title</Cell>}
                cell={<MyLinkCell data={posts} field="title" link="link" />}
                width={200}
            />
            <Column
                header={<Cell>Content</Cell>}
                cell={<MyTextCell data={posts} field="content" />}
                width={250}
            />
            <Column
                header={<Cell>Author</Cell>}
                cell={<MyTextCell data={posts} field="author" />}
                width={150}
            />
            <Column
                header={<Cell>Published Date</Cell>}
                cell={<MyTextCell data={posts} field="publishedDate" />}
                width={150}
                align="center"
            />
        </Table>
    );
};

BlogGrid.propTypes = {
    posts: PropTypes.array.isRequired,
    rowIndex: PropTypes.number
};

export default BlogGrid;
