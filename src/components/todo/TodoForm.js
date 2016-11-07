import React, {PropTypes} from 'react';

const TodoForm = ({todo, onChange, onSave, saving}) => {
    return (
        <form>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="What do you need to do?"
                    name={todo.title}
                    value={todo.title}
                    onChange={onChange}
                />
                    <span className="input-group-btn">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                            onClick={onSave}><i className="glyphicon glyphicon-ok"/> Add
                        </button>
                    </span>
            </div>
        </form>
    );
};

TodoForm.propTypes = {
    todo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default TodoForm;
