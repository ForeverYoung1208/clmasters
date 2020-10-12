import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../../components/Card/Card'

export const OrdersInfo = ({ orders, name, email }) => {
  const { cities, masters, clocks } = useSelector((store) => store.voc)

  return (
    <div>
      {orders?.map((order) => {
        const clock = clocks.find((c) => +c.id === +order.clockId)
        const master = masters.find((m) => +m.id === +order.masterId)
        const city = cities.find((c) => +c.id === +master.cityId)
        const onTime = new Date(order.onTime)
        
        return (
          <Card
            key={order.id}
            header={`Order # ${order.id}`}
            className='orders-info__order'
          >
            <div className ='orders-info__row' >
              <span>Client name: </span> <span>{name}</span>
            </div>
            <div className ='orders-info__row' >
              <span>Client email: </span> <span>{email}</span>
            </div>
            <div className ='orders-info__row' >
              <span>Clock Type: </span> <span>{clock.type}</span>
            </div>
            <div className ='orders-info__row' >
              <span>Master: </span> <span>{master.name}</span>
            </div>
            <div className ='orders-info__row' >
              <span>City: </span> <span>{city.name}</span>
            </div>
            <div className ='orders-info__row' >
              <span>On Time: </span> <span>{onTime.toLocaleString('uk')}</span>
            </div>
            { order.comment && <div className='orders-info__row' >
              <span>Comment: </span> <span>{order.comment}</span>
            </div>}
          </Card>
        )
      })
      
      }


    </div>
    
  )
}


// "id":189,"masterId":2,"clockId":2,"onTime":"2020-10-13T15:00:00.000Z","userId":1,"comment":null,"deletedAt":null}