const express = require('express')
const router = express.Router()
const { Movie, User } = require('../models/')
const { logTable } = require('sequelize-logger')

router.get('/', async (req, res) => {
    const data = await Movie.findAll()
    res.status(200).send(data)
})

router.get('/:id', async (req, res) => {
    const data = await Movie.findByPk(req.params.id)
    if (!data) {
        res.status(404).send(`This Movie ${req.params.id} doesn't exist!`)
        return
    }
    res.send(data)
})

router.delete('/:id', async (req,res) => {
    const deleted = await Movie.destroy({ 
        where: {
            id: req.params.id
        }
    })
    if (!deleted) {
        res.status(404).send(`There is no Movie with an id ${req.params.id}.`)
        return
    }
    res.status(202).send(`Movie with id ${req.params.id} was deleted.`)
})


router.post('/', async (req,res) => {
    try {
        await Movie.create(req.body)
        res.sendStatus(201)
        } catch(error) {
            res.status(400).send(error.errors)
        }
        logTable(Movie)
})


router.put('/:id', async (req,res)=> {
    const movieToUpdate = await Movie.findByPk(req.params.id)

    if (!movieToUpdate) {
        res.sendStatus(404)
        return
    }
    try {
        await movieToUpdate.update(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.errors)
    }

    logTable(Movie)
})


module.exports = router