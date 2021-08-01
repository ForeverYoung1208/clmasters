const app = require('../../app') // Link to server file
const faker = require('faker')
const { User, City, Master } = require('../../models')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const request = supertest(app)
const SALTROUNDS = parseInt(process.env.SECUR_SALTROUNDS)
const JWTSECRET = process.env.SECUR_JWTSECRET

// Building fake data
const userAdmin = {
  name: 'adminUser',
  email: 'siafin2010@gmail.com',
  passwordRaw: '123456',
  isAdmin: true,
}
userAdmin.password = bcrypt.hashSync(userAdmin.passwordRaw, SALTROUNDS)
userAdmin.validAccessToken = jwt.sign(
  { userEmail: userAdmin.email },
  JWTSECRET,
  { expiresIn: '30d' }
)

const userPlain = {
  name: 'plainUser',
  email: 'siafin1111@gmail.com',
  passwordRaw: '1234567',
  isAdmin: false,
}
userPlain.password = bcrypt.hashSync(userPlain.passwordRaw, SALTROUNDS)
userPlain.validAccessToken = jwt.sign(
  { userEmail: userPlain.email },
  JWTSECRET,
  { expiresIn: '30d' }
)
const cityData = {
  name: faker.random.words(1),
  comment: faker.random.words(5),
  isActive: true,
}

const masterData = {
  name: faker.name.firstName(),
  cityId: 'need to assignt after city creation',
  comment: faker.random.words(5),
  deletedAt: null,
  rating: faker.datatype.number(5),
  hourRate: faker.finance.amount(0, 10, 2),
  isActive: true,
}

beforeAll(() => {
  //...
})

describe('masters POST endpoint', () => {
  beforeAll(async () => {
    await User.truncate({ cascade: true })
    await Master.truncate({ cascade: true })
    await City.truncate()
    await City.create(cityData)
    await User.create(userAdmin)
    await User.create(userPlain)
  })

  it('should fail when accessing with invalid token', async () => {
    const response = await request
      .post('/api/masters')
      .set('authorization', 'bearer INVALID-ACCESS-TOKEN')
      .expect(401)

    expect(response.body).toMatchObject({
      error: {
        message: 'jwt malformed',
        name: 'JsonWebTokenError',
      },
    })
  })

  it('should fail when accessing with non-admin account', async () => {
    const response = await request
      .post('/api/masters')
      .set('authorization', `bearer ${userPlain.validAccessToken}`)
      .expect(401)

    expect(response.body).toMatchObject({
      error: 'not authorized',
    })
  })

  it('should fail when got valid token and admin account but master\'s "name" not specified', async () => {
    const city =await City.findOne()
    const noNameMaster = {
      ...masterData,
      cityId: city.id,
      name: null,
    }
    const response = await request
      .post('/api/masters')
      .send(noNameMaster)
      .set('authorization', `bearer ${userAdmin.validAccessToken}`)
      .expect(422)

    expect(response.body).toMatchObject({
      errors: [
        {
          location: 'body',
          msg: 'name must be not empty!',
          param: 'name',
          value: null,
        },
      ],
    })
  })

  it('should fail when got valid token and admin account but "cityId" not specified', async () => {
    const noNameMaster = {
      ...masterData,
      cityId: null,
    }
    const response = await request
      .post('/api/masters')
      .send(noNameMaster)
      .set('authorization', `bearer ${userAdmin.validAccessToken}`)
      .expect(422)

    expect(response.body).toMatchObject({
      errors: [
        {
          location: 'body',
          msg: 'cityId must exist!',
          param: 'cityId',
          value: null,
        },
      ],
    })
    
  })

  it('should create master when got valid token and admin account and valid data', async () => {
    const city =await City.findOne()
    const noNameMaster = {
      ...masterData,
      cityId: city.id,
    }
    const response = await request
      .post('/api/masters')
      .send(noNameMaster)
      .set('authorization', `bearer ${userAdmin.validAccessToken}`)
      .expect(201)

    expect(response.body).toMatchObject({
      'cityId': expect.any(Number),
      'cityName': cityData.name,
      'comment': masterData.comment,
      'deletedAt': null,
      'hourRate': expect.any(String),
      'id': expect.any(Number),
      'isActive': true,
      'name': masterData.name,
      'rating': masterData.rating,
    })

  })
})
