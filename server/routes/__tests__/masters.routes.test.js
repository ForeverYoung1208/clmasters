const app = require('../../app') // Link to server file
const faker = require('faker')
const { User } = require('../../models')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const request = supertest(app)
const SALTROUNDS = parseInt(process.env.SECUR_SALTROUNDS)
const JWTSECRET = process.env.SECUR_JWTSECRET


//Building fake data
const userAdmin = {
  name: 'adminUser',
  email: 'siafin2010@gmail.com',
  passwordRaw: '123456',
  isAdmin:true,
}
userAdmin.password = bcrypt.hashSync(userAdmin.passwordRaw, SALTROUNDS)
userAdmin.validAccessToken = jwt.sign({ userEmail:userAdmin.email }, JWTSECRET, { expiresIn: '30d' })

const userPlain = {
  name: 'plainUser',
  email: 'siafin1111@gmail.com',
  passwordRaw: '1234567',
  isAdmin: false,
}
userPlain.password = bcrypt.hashSync(userPlain.passwordRaw, SALTROUNDS)
userPlain.validAccessToken = jwt.sign({ userEmail:userPlain.email }, JWTSECRET, { expiresIn: '30d' })

  
  
beforeAll(() => {
  //...
})

describe('masters POST endpoint', () => {
  beforeAll(async () => {
    await User.truncate({ cascade: true })
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

  // it('should fail when got valid token and admin account but "name" not specified', () => {
  //     expect().
  // })

  // it('should fail when got valid token and admin account but "cityId" not specified', () => {
  //     expect().
  // })

  // it('should create master when got valid token and admin account and valid data', () => {
  //     expect().
  // })
})
