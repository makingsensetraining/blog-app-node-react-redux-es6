import React from 'react';

const PICTURES = [
    { id: 0, src: 'http://placekitten.com/601/601' },
    { id: 1, src: 'http://placekitten.com/610/610' },
    { id: 2, src: 'http://placekitten.com/620/620' }
]

const Picture = React.createClass({
    render() {
        return (
            <div>
                <img src={PICTURES[this.props.params.id].src} style={{ height: '80%' }} />
            </div>
        )
    }
});

export default Picture;
