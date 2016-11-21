import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PostListRow = ({id, title, content, author, publishedDate}) => {
    return (
        <li>
            <div className="panel panel-info">
                <div className="panel-heading">
                    <Link to={`/app/post-detail/${id}`}>{title}</Link>
                </div>
                <div className="panel-body">
                    <p>{content}</p>
                </div>
                <div className="panel-footer">
                    <div className="post-info">
                        <div className="left">
                            <i className="glyphicon glyphicon-user" /> {author}
                        </div>
                        <div className="right">
                            <i className="glyphicon glyphicon-calendar" /> {publishedDate}
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

PostListRow.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired
};

export default PostListRow;
