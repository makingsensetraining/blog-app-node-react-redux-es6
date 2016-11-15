import React, {PropTypes} from 'react';

const PostInfo = ({posts}) => {
    const quantity = posts.length;
    return (
        <div className="text-muted">
            {quantity} posts found
        </div>
    );
};

PostInfo.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostInfo;
