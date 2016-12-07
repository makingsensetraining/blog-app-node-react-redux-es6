import React, {PropTypes} from 'react';

const DetailPost = ({post}) => {
    return (
        <div>
            <div className="panel panel-info">
                <div className="panel-heading">
                    {post.title}
                </div>
                <div className="panel-body">
                    <p>{post.content}</p>
                </div>
                <div className="panel-footer">
                    <div className="post-info">
                        <div className="left">
                            <i className="glyphicon glyphicon-user" /> {post.author}
                        </div>
                        <div className="right">
                            <i className="glyphicon glyphicon-calendar" /> {post.publishedDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetailPost.propTypes = {
    post: PropTypes.object.isRequired
};

export default DetailPost;
