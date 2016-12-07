import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropModal} from 'boron';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';

class DetailPostModal extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            post: Object.assign({}, props.post),
            saving: false
        };

        //Mapping events
        this.open = this.open.bind(this);
        this.hide = this.hide.bind(this);
        //Mapping events
        this.handleUpdatePost = this.handleUpdatePost.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.post.id != nextProps.post.id){
            //Required to populate form when existing course is loaded directly
            this.setState({ post: Object.assign({}, nextProps.post) });
        }

        if (nextProps.post.error == 'Post not found'){ //Research if this is the best way to do this.
            this.context.router.push('/app/blog-grid');
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
                //this.redirectOnSave();
                this.hide();
            })
            .catch(error => {
                toastr.error(error.description);
                this.setState({ saving:false });
            });
    }

    open(postId){
        this.props.actions.getPost(postId)
            .then(() => {
                this.refs.modal.show();
            })
            .catch(() => {
                toastr.error('There was an error getting the Post detail', 'Error');
            });
    }

    hide(){
        this.refs.modal.hide();
    }

    render() {
        return (
            <div>
                <DropModal ref="modal">
                    <div className={`modal-${this.props.size}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.hide}>×</button>
                                <h3>Edit a Post - <span className="text-muted">{this.state.post.title}</span></h3>
                            </div>
                            <div className="modal-body">
                                <PostForm
                                    onSave={this.handleUpdatePost}
                                    onClose={this.hide}
                                    saving={this.state.saving}
                                    post={this.state.post}
                                />
                                <br />
                                <br />
                            </div>
                            <div className="modal-footer" />
                        </div>
                    </div>
                </DropModal>
            </div>
        );

    }
}

DetailPostModal.defaultProps = {
    size: 'md'
};

DetailPostModal.propTypes = {
    size: PropTypes.string,
    actions: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};

function mapStatesToProps(state, ownProps) {
    return {
        state: state,
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps, null, { withRef: true })(DetailPostModal);
