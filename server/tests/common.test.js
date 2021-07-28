const app = require('../app') // Link to server file
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint', async () => {
  const res = await request.get('/test')
  expect(res.status).toBe(200)
  expect(res.body.message).toBe('pass!')
})