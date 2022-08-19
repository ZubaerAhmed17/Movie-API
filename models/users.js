const {db, DataTypes} = require('../db');

// TODO - define the User model
let User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
})

const seedUsers = [{
    name: 'Zubaer',
    age: 22
},
    {
    name: 'Yahya',
    age: 22
}]

async function seedUser() {
    for (let user of seedUsers){
        await User.create(user)
    }
}
module.exports = {
    seedUser,
    User
}