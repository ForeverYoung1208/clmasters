const app = require('../../app') // Link to server file
const faker = require('faker')
const { User } = require('../../models')
const supertest = require('supertest')
const request = supertest(app)
const bcrypt = require('bcryptjs')
const SALTROUNDS = parseInt(process.env.SECUR_SALTROUNDS)

beforeAll(() => {
  User.destroy({
    where: '',
    truncate: true,
  })
})

describe('masters POST endpoint', () => {
  it('should fail when accessing with invalid token', async () => {
    const name = faker.name.lastName()
    const email = faker.internet.email()
    const password = '123456'
    const passwordHashed = await bcrypt.hash(password, SALTROUNDS)

    const adminUser = await User.create({
      name,
      email,
      password: passwordHashed,
      isAdmin: false
    })

    expect(true).toBe(true)
  })

  // it('should fail when accessing with non-admin account', () => {
  //     expect().
  // })

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
