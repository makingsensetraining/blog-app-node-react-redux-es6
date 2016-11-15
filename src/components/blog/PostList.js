import React, {PropTypes} from 'react';
import PostListRow from './PostListRow';

const PostList = ({posts}) => {
    let postsView = <p>Sorry, there are no posts to display</p>;
    if (posts.length > 0){
        postsView = posts.map((post) =>
            <PostListRow
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                publishedDate={post.publishedDate}
            />
        );
    }

    return (
        <div>
            <ul className="posts-list">
                { postsView }
            </ul>
        </div>
    );
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        publishedDate: PropTypes.string.isRequired
    }).isRequired).isRequired
};

export default PostList;
