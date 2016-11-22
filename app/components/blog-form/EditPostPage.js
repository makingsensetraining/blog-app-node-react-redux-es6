import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';

class EditPostPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        //Execute action to get post data to server
        this.props.actions.getPost(this.props.postId);

        this.state = {
            post: Object.assign({}, props.post),
            saving: false
        };

        //Mapping events
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.post.id != nextProps.post.id){
            //Required to populate form when existing course is loaded directly
            this.setState({ post: Object.assign({}, nextProps.post) });
        }

        if (nextProps.post.error == 'Post not found'){ //Research if this is the best way to do this.
            this.context.router.push('/app/blog');
        }

    }

    handleUpdatePost(post){
        this.setState({ saving: true });

        let postToUpdate = {
            id: this.state.post.id,
            title: post.title,
            author: post.author,
            content: post.content,
            publishedDate: this.state.post.publishedDate
        };
        this.props.actions.updatePost(postToUpdate)
            .then(() => {
                toastr.success('Post updated successfully');
                this.setState({ saving: false });
                this.redirectOnSave();
            })
            .catch(error => {
                toastr.error(error.description);
                this.setState({ saving:false });
            });
    }

    redirectOnSave(){
        this.context.router.push('/app/blog');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h3>Edit a Post <div className="text-muted">{this.state.post.title}</div></h3>
                    <hr />
                    <PostForm
                        onSave={this.handleUpdatePost}
                        saving={this.state.saving}
                        post={this.state.post}
                    />
                </div>
            </div>
        );
    }
}

EditPostPage.propTypes = {
    actions: PropTypes.object.isRequired,
    postId: PropTypes.string,
    post: PropTypes.object
};

// Pull in the React Router context so router is available on this.context.router
EditPostPage.contextTypes = {
    router: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
        postId: ownProps.params.id,
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(EditPostPage);
