import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/actionTypes';
import PostInfo from './PostInfo';
import PostList from './PostList';

class BlogPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h2>My Posts</h2>
                    <Link to="/app/post-create" className="btn btn-primary" activeClassName="active">
                        <i className="glyphicon glyphicon-plus" /> Write new post
                    </Link>
                    <PostInfo
                        posts={this.props.posts}/>
                    <br />
                    <PostList
                        posts={this.props.posts}/>
                </div>
            </div>
        );
    }
}

BlogPage.propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        publishedDate: PropTypes.string.isRequired
    }).isRequired).isRequired
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(BlogPage);
