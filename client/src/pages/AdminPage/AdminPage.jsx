import React from 'react';
import { Card } from '../../components/Card/Card';

import './AdminPage.scss';

const AdminPage = () => {
    return (
        <div className="adminPage">
          <Card
            header = "AdminPage Page here"
          >  
            AdminPage text here
          </Card>
        </div>
    );
};

AdminPage.propTypes = {
    
};

export default AdminPage;
