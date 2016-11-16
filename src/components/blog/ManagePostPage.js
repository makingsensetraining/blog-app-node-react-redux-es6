import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import PostForm from './PostForm';
import toastr from 'toastr';

class ManagePostPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            post: Object.assign({}, props.post),
            errors: Object.assign({}, props.errors),
            saving: false
        };

        //Mapping events
        this.handleUpdateState = this.handleUpdateState.bind(this);
        this.handleSavePost = this.handleSavePost.bind(this);
    }

    handleUpdateState(event){
        const field = event.target.name;
        let post = this.state.post;
        post[field] = event.target.value;
        return this.setState({post: post});
    }

    handleSavePost(event){
        event.preventDefault();

        //Todo: clientSide Post validation?

        this.setState({ saving: true });
        this.props.actions.createPost(this.state.post)
            .then(() => {
                toastr.success('Post created successfully');
                this.setState({ saving: false });
                this.redirectOnSave();
            })
            .catch(error => {
                toastr.error(error.description);
                this.setState({ saving:false });
                this.setState({ errors:error });
            });
    }

    redirectOnSave(){
        this.context.router.push('/blog');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h3>Compose a new Post</h3>
                    <hr />
                    <PostForm
                        onChange={this.handleUpdateState}
                        onSave={this.handleSavePost}
                        saving={this.state.saving}
                        errors={this.state.errors}
                    />
                </div>
            </div>
        );
    }
}

ManagePostPage.propTypes = {
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    errors: PropTypes.object
};

// Pull in the React Router context so router is available on this.context.router
ManagePostPage.contextTypes = {
    router: PropTypes.object
};

function mapStatesToProps(state, ownProps) {

    let post = {
        id: 0,
        title: '',
        content: '',
        author: '',
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

export default connect(mapStatesToProps, mapDispatchToProps)(ManagePostPage);
