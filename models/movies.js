const {db, DataTypes} = require('../db');


// TODO - define the Movie model
let Movie = db.define('Movie', {
    name: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
})


const seedMovies = [{
    name: 'LOTR',
    duration: 4,
    rating: 9.3,
    status: 'watched'
},
    {
    name: 'Harry Potter',
    duration: 3,
    rating: 9,
    status: 'not watched'
}]

async function seedMovie() {
    for (let movie of seedMovies){
        await Movie.create(movie)
    }
}

module.exports = {
    seedMovie,
    Movie
}