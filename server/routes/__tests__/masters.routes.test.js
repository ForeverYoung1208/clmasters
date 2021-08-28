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
  hourRate: '9.46',
  isActive: true,
}

beforeAll(async () => {
  await User.truncate({ cascade: true, force: true })
  await Master.truncate({ cascade: true, force: true  })
  await City.truncate( {cascade: true, force: true} )
  await City.create(cityData)
  await User.create(userAdmin)
  await User.create(userPlain)
})



describe('masters POST endpoint', () => {
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
    const noCityMaster = {
      ...masterData,
      cityId: null,
    }
    const response = await request
      .post('/api/masters')
      .send(noCityMaster)
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
    const newMaster = {
      ...masterData,
      cityId: city.id,
    }
    const response = await request
      .post('/api/masters')
      .send(newMaster)
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



describe('masters PUT endpoint', () => {
  let oldMaster
  beforeAll(async () => {
    const city =await City.findOne()
    oldMaster = await Master.create({
      ...masterData,
      cityId: city.id,
    })
  })
  
  it('should fail when accessing with invalid token', async () => {
    const response = await request
      .put(`/api/masters/${oldMaster.id}`)
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
      .put(`/api/masters/${oldMaster.id}`)
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
      .put(`/api/masters/${oldMaster.id}`)
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
    const noCityMaster = {
      ...masterData,
      cityId: null,
    }
    const response = await request
      .put(`/api/masters/${oldMaster.id}`)
      .send(noCityMaster)
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

  it('should update master when got valid token and admin account and valid data', async () => {
    const city =await City.findOne()
    const newNameMaster = {
      ...masterData,
      name: 'new Master name',
      cityId: city.id,
    }
    
    const response = await request
      .post('/api/masters')
      .send(newNameMaster)
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
      'name': newNameMaster.name,
      'rating': masterData.rating,
    })
  })
})



describe('masters DELETE endpoint', () => {
  let oldMaster
  beforeAll(async () => {
    const city =await City.findOne()
    oldMaster = await Master.create({
      ...masterData,
      cityId: city.id,
    })
  })
  
  it('should fail when accessing with invalid token', async () => {
    const response = await request
      .delete(`/api/masters/${oldMaster.id}`)
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
      .delete(`/api/masters/${oldMaster.id}`)
      .set('authorization', `bearer ${userPlain.validAccessToken}`)
      .expect(401)

    expect(response.body).toMatchObject({
      error: 'not authorized',
    })
  })

  it('should delete master when got valid token and admin account', async () => {
    await request
      .delete(`/api/masters/${oldMaster.id}`)
      .set('authorization', `bearer ${userAdmin.validAccessToken}`)
      .expect(204)
    
    const checkIsMasterDeleted = await Master.findByPk(oldMaster.id)

    expect(checkIsMasterDeleted).toBe(null)
  })
})



describe('masters GET endpoint', () => {
  let master1, master2
  beforeAll(async () => {
    await Master.truncate({ cascade: true, force: true  })
    const city = await City.findOne()
    master1 = await Master.create({
      ...masterData,
      cityId: city.id,
      name: faker.name.firstName()
    })
    master2 = await Master.create({
      ...masterData,
      cityId: city.id,
      name: faker.name.firstName()
    })
  })
  
  it('should respond with masters array without pagination if no pagination params given', async () => {
    const response = await request
      .get('/api/masters')
      .expect(200)
    
    expect(response.body).toMatchObject({
      'currentPage': null,
      data:
        [{
          'cityId': expect.any(Number),
          'cityName': cityData.name,
          'comment': master1.comment,
          'deletedAt': null,
          'hourRate': expect.any(String),
          'id': expect.any(Number),
          'isActive': true,
          'name': master1.name,
          'rating': master1.rating,
        },
        {
          'cityId': expect.any(Number),
          'cityName': cityData.name,
          'comment': master2.comment,
          'deletedAt': null,
          'hourRate': expect.any(String),
          'id': expect.any(Number),
          'isActive': true,
          'name': master2.name,
          'rating': master2.rating,
        },
        ]
    })
  })
  
  it('should fail if page given but page size not given', async () => {
    const response = await request
      .get('/api/masters?page=1')
      .expect(400)
    
    expect(response.body).toMatchObject({
      errors: [
        {
          msg: 'pageSize must be specified!',
          param: 'masters',
        },
      ],
    })
  })
  
  it('should fail if page size given but page not given', async () => {
    const response = await request
      .get('/api/masters?pageSize=3')
      .expect(400)
    
    expect(response.body).toMatchObject({
      errors: [
        {
          msg: 'page must be specified!',
          param: 'masters',
        },
      ],
    })
  })
  
  it('should respond with paginated masters array if pagination params given', async () => {
    const city = await City.findOne()
    const master3 = await Master.create({
      ...masterData,
      cityId: city.id,
      name: faker.name.firstName()
    })
    const master4 = await Master.create({
      ...masterData,
      cityId: city.id,
      name: faker.name.firstName()
    })

    const response = await request
      .get('/api/masters?page=1&pageSize=3')
      .expect(200)
    
    expect(response.body).toMatchObject({
      'currentPage': 2,
      'totalCount': 4,
      data:
        [{
          'cityId': expect.any(Number),
          'cityName': cityData.name,
          'comment': master1.comment,
          'deletedAt': null,
          'hourRate': expect.any(String),
          'id': expect.any(Number),
          'isActive': true,
          'name': master1.name,
          'rating': master1.rating,
        }]
    })
  })  
  
  
})