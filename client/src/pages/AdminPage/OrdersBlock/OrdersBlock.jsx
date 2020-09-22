import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const OrdersBlock = () => {

  const orders = useSelector((store) => store.admin.orders)

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={orders}
        fields={{
          onTime:['on time','adminPage__field--time'],
          clockId:['clock type','adminPage__field--clock'],
          masterId:['master','adminPage__field--master'],
          userId:['client','adminPage__field--user'],
          comment: ['comment','adminPage__field--comment'],
        }}        
        deleteItem={ (id) => { console.log(`delete order ${id}`) }}
        updateItem={ (id) => { console.log(`update order ${id}`) }}
        addItem={() => { console.log('add order') }}

      />
    </div>
  )
}