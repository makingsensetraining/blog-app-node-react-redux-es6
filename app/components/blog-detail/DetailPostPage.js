import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import {Link} from 'react-router';
import DetailPost from './DetailPost';
import toastr from 'toastr';

class DetailPostPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        props.actions.getPost(this.props.postId); //Execute call to get the post object

        this.handleDeletePost = this.handleDeletePost.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.post.error == 'Post not found'){ //Research if this is the best way to do this.
            this.context.router.push('/app/blog');
        }
    }

    handleDeletePost(){
        if (confirm('Do you want to delete the Post with title: ' + this.props.post.title)){
            const postId = this.props.post.id;
            this.props.actions.deletePost(postId)
                .then(() => {
                    toastr.success('Post removed');
                    //redirect
                    this.context.router.push('/app/blog');
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <DetailPost
                        post={this.props.post}
                    />
                    <div className="well well-sm actions">
                        <Link to={`/app/post-edit/${this.props.post.id}`} className="btn btn-primary"><i className="glyphicon glyphicon-edit"/> Edit</Link>
                        <a onClick={this.handleDeletePost} className="btn btn-danger"><i className="glyphicon glyphicon-trash"/> Delete</a>
                        <Link to="/app/blog" className="btn btn-default"><i className="glyphicon glyphicon-chevron-left"/> Go Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

DetailPostPage.propTypes = {
    actions: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
DetailPostPage.contextTypes = {
    router: PropTypes.object
};

function mapStatesToProps(state, ownProps) {
    const postId = ownProps.params.id; //getting id from router

    return {
        state: state,
        postId: postId,
        post: state.post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(DetailPostPage);
