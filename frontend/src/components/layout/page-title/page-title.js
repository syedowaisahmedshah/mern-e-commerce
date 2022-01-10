import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({title}) => {
    return (
        <Helmet>
            <title>{`${title} - Mern-e-Commerce`}</title>
        </Helmet>
    );
}

export default PageTitle;