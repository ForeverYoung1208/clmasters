import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const CitiesBlock = () => {
  
  const cities = useSelector((store) => store.voc.cities)

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={cities}
        fields={{
          name: ['name', 'adminPage__field--name'],  // key: label, className
          comment: ['comment','adminPage__field--comment']
        }}
        deleteItem={ (id) => { console.log(`delete city ${id}`) }}
        updateItem={ (id) => { console.log(`update city ${id}`) }}
        addItem={() => { console.log('add city') }}

      />
    </div>
  )
}