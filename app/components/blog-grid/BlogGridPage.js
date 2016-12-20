import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as postActions from '../../actions/postActions';
import BlogGridExternal from './BlogGridExternal';
import CreatePostModal from '../blog-form/CreatePostModal';
import DetailPostModal from '../blog-detail/DetailPostModal';
import EditPostModal from '../blog-form/EditPostModal';
import ConfirmModal from '../common/ConfirmModal';

import {Link} from 'react-router';


class BlogGridPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        //Mapping events
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
        this.openDetailModal = this.openDetailModal.bind(this);
        this.openEditPostModal = this.openEditPostModal.bind(this);
    }

    componentWillReceiveProps(nextProps){
        for (let post of nextProps.posts) {
            // post.linkDetail = `/app/post-detail/${post.id}`;
            post.linkEdit = `/app/post-edit/${post.id}`;

        }
    }

    openEditPostModal(postId){
        this.editPostModal.getWrappedInstance().open(postId);
    }

    openDetailModal(postId){
        this.detailPostModal.getWrappedInstance().open(postId);
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
                    <Link to="/app/blog-grid#post-create" className="btn btn-primary">
                        <i className="glyphicon glyphicon-plus" /> Write new post
                    </Link>
                    <br />
                    <hr />

                    <BlogGridExternal
                        useGridStyles={false}
                        showFilter={true}
                        resultsPerPage={10}
                        useCustomPagerComponent={true}
                        deleteCallback={this.openConfirmModal}
                        detailCallback={this.openDetailModal}
                        editCallback={this.openEditPostModal}
                    />


                    <DetailPostModal
                        ref={(child) => { this.detailPostModal = child; }}
                    />

                    <EditPostModal
                        ref={(child) => { this.editPostModal = child; }}
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
    actions: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {

    return {
        state: state,
        posts: state.postsData.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(BlogGridPage);
