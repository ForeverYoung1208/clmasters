const { City } = require('../models/index')
const citiesController = () => {
  async function getCity(id){
    const city = await City.findOne({where: {id}})
    return ({
      status: 200, 
      json: {
        message:'One city fetched',
        city: city
      }  
    })  }

  async function getCities(){
    const cities = await City.findAll()
    const cd = cities.map((c) => c.dataValues )
    return ({
      status: 200, 
      json: {
        message:'All cities fetched',
        cities: cd
      }  
    })
  }

  async function createCity({inName, inComment}) {
    let newCity = await City.create({name, comment})
    if(newCity && !newCity.error){
      return({
        status: 201,
        json:{message: 'City created', city:{ id: newCity.id, email: newCity.email}}
      })
    } else {
      return({
        status: 400,
        json:{message: `City NOT created: ${newCity.error ? newCity.error: 'something wrong'}` }
      })
    }    
  }

  async function deleteCity(id) {
    let deletedCount = await City.destroy({where:{id}})
    if( deletedCount && deletedCount>0){
      return({
        status: 200,
        json:{message: 'City deleted', deletedCount}
      })
    } else {
      return({
        status: 400,
        json:{message: `City NOT deleted, something wrong'}` }
      })
    }    
  }

  async function updateCity({id, inName, inComment}) {
    let count = await City.update({name, comment}, {where:{id}} )
    let newCity  = await City.findOne({where:{id}})
    if(newCity && !newCity.error && count && count>0){
      return({
        status: 201,
        json:{message: 'City updated', city:{ id: newCity.id, email: newCity.email}}
      })
    } else {
      return({
        status: 400,
        json:{message: `City got errors while updating: ${newCity.error ? newCity.error: 'something wrong'}, updated count =${ count }` }
      })
    }    
  }  




  //============//

  return ({getCity, getCities, createCity, deleteCity, updateCity })

};

exports.citiesController = citiesController();