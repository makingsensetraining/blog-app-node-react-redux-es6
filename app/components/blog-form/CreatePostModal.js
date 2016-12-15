import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropModal} from 'boron';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';

class CreatePostModal extends React.Component {
    constructor(props, context){
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
                this.props.hide();
            })
            .catch(error => {
                toastr.error(error.description);
                this.setState({ saving:false });
            });
    }

    render() {
        return (
            <div>
                <PostForm
                    onSave={this.handleSavePost}
                    saving={this.state.saving}
                    post={this.state.post}
                />
                <br />
                <br />
            </div>
        );

    }
}

CreatePostModal.propTypes = {
    actions: PropTypes.object.isRequired,
    post: PropTypes.object
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

export default connect(mapStatesToProps, mapDispatchToProps, null, { withRef: true })(CreatePostModal);
