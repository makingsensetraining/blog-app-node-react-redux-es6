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
        this.open = this.open.bind(this);
        this.hide = this.hide.bind(this);
        this.onHide = this.onHide.bind(this);
        this.handleSavePost = this.handleSavePost.bind(this);
    }

    componentDidMount(){
        this.open();
    }

    open(){
        this.refs.modal.show();
    }

    hide(){
        this.refs.modal.hide();
    }

    onHide(){
        window.location.hash = '!';
    }

    handleSavePost(post){
        this.setState({saving: true});
        this.props.actions.createPost(post)
            .then(() => {
                toastr.success('Post created successfully');
                this.setState({saving: false});
                this.hide();
            })
            .catch(error => {
                toastr.error(error.description);
                this.setState({saving: false});
            });
    }

    render() {
        return (
            <div>
                <DropModal ref="modal" onHide={this.onHide}>
                    <div className={`modal-${this.props.size}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.hide}>×</button>
                                <h2 className="modal-title">Compose a new Post</h2>
                            </div>
                            <div className="modal-body">
                                <PostForm
                                    onSave={this.handleSavePost}
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

CreatePostModal.defaultProps = {
    size: 'md'
};

CreatePostModal.propTypes = {
    size: PropTypes.string,
    actions: PropTypes.object,
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
