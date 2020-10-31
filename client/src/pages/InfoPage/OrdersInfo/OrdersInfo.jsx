import React from 'react'
import Card from '../../../components/Card/Card'

export const OrdersInfo = ({ orders }) => {

  return (
    <div>
      {orders?.map((order) => {
        const { 
          id,
          onTime: onTimeStr,
          user,
          clock,
          master,
          comment
        } = order
        
        const onTime = new Date(onTimeStr)
        
        return (
          <Card
            key={id}
            header={`Order # ${id}`}
            className='orders-info__order'
          >
            <div className ='orders-info__row' >
              <span>Client name: </span> <span>{user?.name}</span>
            </div>
            <div className ='orders-info__row' >
              <span>Client email: </span> <span>{user?.email}</span>
            </div>
            <div className ='orders-info__row' >
              <span>Clock Type: </span> <span>{clock?.type}</span>
            </div>
            <div className ='orders-info__row' >
              <span>Master: </span> <span>{master?.name}</span>
            </div>
            <div className ='orders-info__row' >
              <span>City: </span> <span>{master?.city?.name}</span>
            </div>
            <div className ='orders-info__row' >
              <span>On Time: </span> <span>{onTime?.toLocaleString('uk')}</span>
            </div>
            { order.comment && <div className='orders-info__row' >
              <span>Comment: </span> <span>{comment}</span>
            </div>}
          </Card>
        )
      })
      
      }


    </div>
    
  )
}
