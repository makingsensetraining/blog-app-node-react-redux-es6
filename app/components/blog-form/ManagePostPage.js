import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';

class ManagePostPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        if (this.props.postId) { //If the request coming from the edit view
            //Execute action to get post data to server
            this.props.actions.getPost(this.props.postId);
        }

        this.state = {
            post: Object.assign({}, props.post),
            saving: false
        };

        //Mapping events
        this.handleSavePost = this.handleSavePost.bind(this);
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

    handleSavePost(post){
        this.setState({ saving: true });

        if (this.state.post.id == 0){ //New Post
            this.props.actions.createPost(post)
                .then(() => {
                    toastr.success('Post created successfully');
                    this.setState({ saving: false });
                    this.redirectOnSave();
                })
                .catch(error => {
                    toastr.error(error.description);
                    this.setState({ saving:false });
                });
        } else { //Existing Post so -> Update Post
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

    }

    redirectOnSave(){
        this.context.router.push('/app/blog');
    }

    render() {
        let title = <h3>Compose a new Post</h3>;
        if (this.props.postId) { //If coming from EDIT
            title = <h3>Edit a Post <div className="text-muted">{this.state.post.title}</div></h3>;
        }

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    {title}
                    <hr />
                    <PostForm
                        onSave={this.handleSavePost}
                        saving={this.state.saving}
                        post={this.state.post}
                    />
                </div>
            </div>
        );
    }
}

ManagePostPage.propTypes = {
    actions: PropTypes.object.isRequired,
    postId: PropTypes.string,
    post: PropTypes.object
};

// Pull in the React Router context so router is available on this.context.router
ManagePostPage.contextTypes = {
    router: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    let id = null;
    let post = {
        id: 0,
        title: '',
        author: '',
        content: '',
        publishedDate: ''
    };

    if (ownProps.params.id){
        id = ownProps.params.id;
        post = state.post;
    }

    return {
        state: state,
        postId: id,
        post: post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(ManagePostPage);
