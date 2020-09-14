import React from 'react';
import { Card } from '../../components/Card/Card';
import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { MastersBlock } from './MastersBlock/MastersBlock';


import './AdminPage.scss';

const AdminPage = () => {
    return (
        <div className="adminPage">
          <Card header = "Cities management" >  
            <CitiesBlock/>
          </Card>
          <Card header = "Masters management" >  
            <MastersBlock/>
          </Card>
        </div>
    );
};

AdminPage.propTypes = {
    
};

export default AdminPage;
