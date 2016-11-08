import React, {PropTypes} from 'react';

const TodoForm = ({todo, onChange, onSave, saving, errors}) => {
    let wrapperClass = 'input-group';
    console.log(errors);
    // if (errors.title && errors.title.length > 0){
    //     wrapperClass += " " + 'has-error';
    // }

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
            <div>

            </div>
            </div>
        </form>
    );
};

TodoForm.propTypes = {
    todo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
};

export default TodoForm;
