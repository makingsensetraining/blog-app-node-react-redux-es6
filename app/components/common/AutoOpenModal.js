import React, {PropTypes} from 'react';
import {DropModal} from 'boron';

class AutoOpenModal extends React.Component {
    constructor(props, context){
        super(props, context);

        this.open = this.open.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount(){
        this.open();
    }

    open(){
        this.refs.modal.show();
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
                                <h2 className="modal-title">{this.props.title}</h2>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </DropModal>
            </div>
        );

    }
}

AutoOpenModal.defaultProps = {
    size: 'md'
};

AutoOpenModal.propTypes = {
    size: PropTypes.string,
    title: PropTypes.string
};

export default AutoOpenModal;
