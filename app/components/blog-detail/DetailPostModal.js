import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {DropModal} from 'boron';
import * as postActions from '../../actions/postActions';
import DetailPost from './DetailPost';
import toastr from 'toastr';

class DetailPostModal extends React.Component {
    constructor(props, context){
        super(props, context);

        //Mapping events
        this.open = this.open.bind(this);
        this.hide = this.hide.bind(this);
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
                                <h2 className="modal-title">Post Detail - {this.props.post.title}</h2>
                            </div>
                            <div className="modal-body">
                                <DetailPost
                                    post={this.props.post}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" type="button" onClick={this.hide}>Close</button>
                            </div>
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
