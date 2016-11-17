import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PostForm = ({onChange, onSave, saving, errors}) => {
    let wrapperTitleClass = 'form-group';
    let wrapperContentClass = 'form-group';
    let displayErrorsTitle = '';
    let displayErrorsContent = '';

    if (errors && errors.type == 'title') {
        wrapperTitleClass = 'form-group has-error';
        displayErrorsTitle = <div className="alert alert-danger">{errors.description}</div>;
    }
    if (errors && errors.type == 'content'){
        wrapperContentClass = 'form-group has-error';
        displayErrorsContent = <div className="alert alert-danger">{errors.description}</div>;
    }

    return (
        <form>
            <div className={wrapperTitleClass}>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Write the post title..."
                    onChange={onChange}
                />
                {displayErrorsTitle}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="author"
                    placeholder="Write the author name."
                    onChange={onChange}
                />
            </div>
            <div className={wrapperContentClass}>
                <textarea
                    type="text"
                    className="form-control"
                    name="content"
                    placeholder="Write your post..."
                    onChange={onChange}
                />
                {displayErrorsContent}
            </div>
            <input
                type="submit"
                className="btn btn-primary"
                value={saving ? 'Saving...' : 'Save'}
                disabled={saving}
                onClick={onSave}
            />
            &nbsp;
            <Link to="/blog" className="btn btn-default">Cancel</Link>
        </form>
    );
};

PostForm.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired,
    errors: PropTypes.object
};

export default PostForm;
