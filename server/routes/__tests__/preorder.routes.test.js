const app = require('../../app') // Link to server file
const supertest = require('supertest')
var addHours = require('date-fns/addHours')
const request = supertest(app)
const faker = require('faker')
const { User, City, Master, Clock, Order } = require('../../models')



// Building fake data

const cityData = {
  name: 'Blood covenant',
  isActive: true,
  comment: faker.random.words(4),
}

const clockData = {
  type: 'Small',
  repairTime: '01:00:00',
  comment: faker.random.words(4),
}

const userData = {
  name: faker.random.word(),
  email: faker.internet.email(),
  passwordRaw: '1234567',
  isAdmin: false,
}

const masterData = {
  mame: 'Slash',
  cityId: '--- assign later, when records created ---',
  rating: '4',
  comment: faker.random.words(4),
  hourRate: '1.5',
  isActive: true,
}

const orderData = {
  clockId: '--- assign later, when records created ---',
  masterId: '--- assign later, when records created ---',
  userId: '--- assign later, when records created ---',
  comment: faker.random.words(4),
  price: 3,
  payedSum: 2,
  onTime: '2021-08-08T22:00'

}

const preorderData = {
  cityId: '--- assign later, when records created ---',
  orderDateTimeStr: '2021-08-08 22:00',
  clockTypeId: '--- assign later, when records created ---',
}


describe('preorder POST endpoint', () => {
  let city, clock, master, user, order
  
  beforeAll(async () => {
    await City.truncate({ cascade: true, force: true })
    await Clock.truncate({ cascade: true, force: true })
    await User.truncate({ cascade: true, force: true })
    await Master.truncate({ cascade: true, force: true })
    await Order.truncate({ cascade: true, force: true })
    
    city = await City.create(cityData)
    clock = await Clock.create(clockData)
    user = await User.create(userData)
    master = await Master.create({
      ...masterData,
      cityId: city.id
    })
    order = await Order.create({
      ...orderData,
      clockId: clock.id,
      masterId: master.id,
      userId: user.id,
    })
  })
  
  
  it('should fail if cityId not cpecified', async () => {
    const response = await request
      .post('/api/preorder')
      .send({
        ...preorderData,
        cityId: null,
        clockId: clock.id,
      })
      .expect(422)

    expect(response.body).toMatchObject({
      errors: [
        {
          location: 'body',
          msg: 'cityId must be specified!',
          param: 'cityId',
          value: null,
        },
      ],
    })
 
  })

  it('should fail if clockId not cpecified', async () => {
    const response = await request
      .post('/api/preorder')
      .send({
        ...preorderData,
        cityId: city.id,
        clockId: null,
      })
      .expect(422)

    expect(response.body).toMatchObject({
      errors: [
        {
          location: 'body',
          msg: 'clockId must be specified!',
          param: 'clockId',
          value: null,
        },
      ],
    })
  })
  
  it('should fail if onTime in the past', async () => {
    const nowMinusHour = addHours(new Date(), -1)
    const response = await request
      .post('/api/preorder')
      .send({
        ...preorderData,
        onTime: nowMinusHour.toISOString(),
        cityId: city.id,
        clockId: clock.id,
      })
      .expect(422)

    expect(response.body).toMatchObject({
      errors: [
        {
          location: 'body',
          msg: 'Order date can\'t be in the past ',
          param: 'onTime',
          value: expect.any(String),
        },
      ],
    })

  })

  it('should fail if there is no free master in the given city at given time', async () => {
    // expect(true).toBe(true)
  })
  
  it('should return free masters when request is correct and there are free masters', async () => {
    // expect(true).toBe(true)
  })

  
  

})

