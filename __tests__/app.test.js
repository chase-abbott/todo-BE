const mongoose = require('mongoose')
const { User } = require('../connection.js')

describe('api routes', () => {
  beforeEach(() => {
    return User.deleteMany({})
  })
  // afterEach(() => {
  //   mongoose.disconnect()
  // })
  it('signs a user up to the database', async () => {
    const user = {
      username: 'chase',
      password: 'password'
    }
    // const newUser = await User.findOne({ username: 'chase' })
    // console.log(newUser)

    // expect(newUer).toEqual({ _id: expect.any(String), ...user })

  })
})