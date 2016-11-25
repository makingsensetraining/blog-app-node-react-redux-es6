import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions from '../../actions/postActions';
import BlogGrid from './BlogGrid';

class BlogGridPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        props.actions.loadPosts(); //Execute call to get the posts action
    }

    componentWillReceiveProps(nextProps){
        for (let post of nextProps.posts) {
            post.link = `/app/post-detail/${post.id}`;
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <h2>My Posts - Grid</h2>
                    <BlogGrid
                        data={this.props.posts}
                        useGridStyles={false}
                        showFilter={true}
                        resultsPerPage={10}
                        useCustomPagerComponent={true}
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
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    };
}

export default connect(mapStatesToProps, mapDispatchToProps)(BlogGridPage);
