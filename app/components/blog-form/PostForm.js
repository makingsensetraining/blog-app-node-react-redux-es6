import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Formsy from 'formsy-react';
import {Input, Textarea} from 'formsy-react-components';

class PostForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            canSubmit: false
        };

        //Mapping events
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.submit = this.submit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    enableButton() {
        this.setState({canSubmit: true});
    }

    disableButton() {
        this.setState({canSubmit: false});
    }

    submit(model) {
        this.props.onSave(model);
    }

    resetForm(){
        this.refs.form.reset();
    }

    render() {
        return (
            <div>
                <Formsy.Form ref="form" className="horizontal" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    <Input
                        formNoValidate
                        name="title"
                        label="Title"
                        placeholder="Write the post title..."
                        validations="minLength:3"
                        validationError="The minimum length is 3 characters"
                        value={this.props.post.title || ''}
                        required />
                    <Input
                        formNoValidate
                        name="author"
                        label="Author"
                        placeholder="Write the author name."
                        validations="isWords,minLength:3"
                        validationErrors={{
                            isWords: 'Only letters allowed',
                            minLength: 'The minimum length is 3 characters'
                        }}
                        value={this.props.post.author || ''}
                        required />
                    <Textarea
                        formNoValidate
                        cols={10}
                        rows={10}
                        name="content"
                        label="Content"
                        placeholder="Write your post..."
                        validations="minLength:5"
                        validationError="The minimum length is 5 characters"
                        value={this.props.post.content || ''}
                        required
                    />
                    <div className="clearfix pull-right">
                        <button type="button" className="btn btn-danger" onClick={this.resetForm}>Reset Values</button>
                        &nbsp;
                        <input type="submit" className="btn btn-primary"
                                disabled={!this.state.canSubmit}
                                value={this.props.saving ? 'Saving... ' : 'Save'}
                        />
                        &nbsp;
                        <a onClick={this.props.onClose} className="btn btn-default">Cancel</a>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}

PostForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default PostForm;
