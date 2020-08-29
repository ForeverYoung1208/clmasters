import React from 'react';

import './InfoPage.scss';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

const InfoPage = () => {
    return (
        <>
          <ErrorMessage/>
          <div className="infoPage">infoPage</div>
        </>
        
    );
};

export default InfoPage;
