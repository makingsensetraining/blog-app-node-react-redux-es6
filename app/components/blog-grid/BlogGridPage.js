import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import {Link} from 'react-router';
import * as postActions from '../../actions/postActions';
import BlogGridExternal from './BlogGridExternal';
import CreatePostModal from '../blog-form/CreatePostModal';
import ConfirmModal from '../common/ConfirmModal';


class BlogGridPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.openNewPostModal = this.openNewPostModal.bind(this);
    }

    componentWillReceiveProps(nextProps){
        for (let post of nextProps.posts) {
            post.linkDetail = `/app/post-detail/${post.id}`;
            post.linkEdit = `/app/post-edit/${post.id}`;
        }
    }

    openNewPostModal(){
        this.newPostModal.getWrappedInstance().open();
    }

    handleDeletePost(){
        this.props.actions.deletePost(this.state.postToDelete.id)
            .then(() => {
                toastr.success('Post removed');
            })
            .catch(error => {
                toastr.error(error);
            });

    }

    openConfirmModal(post){
        this.setState({
            postToDelete: post
        });

        this.deleteConfirmModal.open();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h2>My Posts - Grid</h2>
                    <a onClick={this.openNewPostModal} className="btn btn-primary">
                        <i className="glyphicon glyphicon-plus" /> Write new post
                    </a>
                    <br />
                    <hr />

                    <BlogGridExternal
                        useGridStyles={false}
                        showFilter={true}
                        resultsPerPage={10}
                        useCustomPagerComponent={true}
                        deleteCallback={this.openConfirmModal}
                    />

                    <CreatePostModal
                        size="md"
                        ref={(child) => { this.newPostModal = child; }}
                    />

                    <ConfirmModal
                        title="Post delete"
                        body="Are you sure you want to delete this post?"
                        ref={(child) => { this.deleteConfirmModal = child; }}
                        confirm={this.handleDeletePost}
                    />
                </div>
            </div>
        );
    }
}

BlogGridPage.propTypes = {
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
        posts: state.posts,
        count: state.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(BlogGridPage);
