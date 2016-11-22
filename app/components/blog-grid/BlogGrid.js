import React, {PropTypes} from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

const BlogGrid = ({posts}) => {
    return (
        <Table
            rowHeight={50}
            rowsCount={posts.length}
            width={850}
            height={500}
            headerHeight={50}>
            <Column
                header={<Cell>ID</Cell>}
                cell={props => (
                    <Cell {...props}>
                        {posts[props.rowIndex].id}
                    </Cell>
                )}
                width={50}
            />
            <Column
                header={<Cell>Title</Cell>}
                cell={props => (
                    <Cell {...props}>
                        {posts[props.rowIndex].title}
                    </Cell>
                )}
                width={200}
            />
            <Column
                header={<Cell>Content</Cell>}
                cell={props => (
                    <Cell {...props}>
                        {posts[props.rowIndex].content}
                    </Cell>
                )}
                width={300}
            />
            <Column
                header={<Cell>Author</Cell>}
                cell={props => (
                    <Cell {...props}>
                        {posts[props.rowIndex].author}
                    </Cell>
                )}
                width={150}
            />
            <Column
                header={<Cell>Published Date</Cell>}
                cell={props => (
                    <Cell {...props}>
                        {posts[props.rowIndex].publishedDate}
                    </Cell>
                )}
                width={150}
            />
        </Table>
    );
};

BlogGrid.propTypes = {
    posts: PropTypes.array.isRequired,
    rowIndex: PropTypes.number
};

export default BlogGrid;
