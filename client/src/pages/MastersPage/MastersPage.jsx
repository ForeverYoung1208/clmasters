import React from 'react';
import { Card } from '../../components/Card/Card';
import { PreorderForm } from './PreorderForm/PreorderForm';
import './MastersPage.scss';



const MastersPage = () => {

  return (
    <div className="mastersPage">
      <Card
        header = "To find a master, we must ask you for some information:"
      >  
        <PreorderForm/> 
      </Card>
    </div>
  );
};

MastersPage.propTypes = {
    
};

export default MastersPage;
