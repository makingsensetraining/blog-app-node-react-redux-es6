import React, { PropTypes } from 'react';


const propTypes = {
    location: PropTypes.object.isRequired,
};

function HashLinkPage({ location }) {
    return (
        <div>
            <section id="post-create">
            <h2>Section One</h2>
            <p>testing hash</p>
        </section>
        </div>
    );
}

HashLinkPage.propTypes = propTypes;

export default HashLinkPage;
