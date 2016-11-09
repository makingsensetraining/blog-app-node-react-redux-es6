import React, {PropTypes} from 'react';

const TodoForm = ({todo, onChange, onSave, saving, errors}) => {
    const wrapperClass = (errors && errors.length > 0) ? 'input-group has-error' : 'input-group';

    return (
        <form>
            <div className={wrapperClass}>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={todo.title}
                    onChange={onChange}
                />
                    <span className="input-group-btn">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                            value={saving ? 'Saving...' : 'Save '}
                            onClick={onSave}
                        />
                    </span>
            </div>
            <div>
                {errors && <div className="alert alert-danger">{errors}</div>}
            </div>
        </form>
    );
};

TodoForm.propTypes = {
    todo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.string
};

export default TodoForm;
