const express = require("express")
const app = express()
const users = require('./routes/users')
const movies = require('./routes/movies')
const { seed } = require('./models')

app.use(express.json())
app.use('/users', users)
app.use('/movies', movies)


async function main(port) {
    await seed()
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

main(3000)
