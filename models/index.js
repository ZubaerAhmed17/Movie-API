const { db } = require('../db')
const { seedMovie, Movie } = require('./movies')
const { seedUser, User } = require('./users')

async function seed() {
// force true prevents duplication of data
    await db.sync({force: true}) 
    await seedUser()
    await seedMovie()
}


module.exports = { seed, Movie, User }