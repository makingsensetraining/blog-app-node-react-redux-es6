import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';

const MyInput = React.createClass({ // eslint-disable-line react/prefer-es6-class
    propTypes: {
        placeholder: PropTypes.string
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },

    render() {
        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        const className = this.showRequired() ? 'form-group' : this.showError() ? 'form-group has-error' : null;

        const placeHolder = this.props.placeholder ? this.props.placeholder : '';

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        const errorMessage = this.getErrorMessage();

        return (
            <div className={className}>
                <input
                    type="text"
                    className="form-control"
                    placeholder={placeHolder}
                    onChange={this.changeValue}
                    value={this.getValue() || ''}
                />
                <span className="help-block validation-message">{errorMessage}</span>
            </div>
        );
    }
});

export default MyInput;
