import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';

class CreatePostPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            post: Object.assign({}, props.post),
            saving: false
        };

        //Mapping events
        this.handleSavePost = this.handleSavePost.bind(this);
    }

    handleSavePost(post){
        this.setState({ saving: true });
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
    }

    redirectOnSave(){
        this.context.router.push('/app/blog');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h3>Compose a new Post</h3>
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

CreatePostPage.propTypes = {
    actions: PropTypes.object.isRequired,
    post: PropTypes.object
};

// Pull in the React Router context so router is available on this.context.router
CreatePostPage.contextTypes = {
    router: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    let post = {
        id: 0,
        title: '',
        author: '',
        content: '',
        publishedDate: ''
    };

    return {
        state: state,
        post: post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(CreatePostPage);
