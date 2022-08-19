const express = require('express')
const router = express.Router()
const { Movie, User } = require('../models/')
const { logTable } = require('sequelize-logger')

router.get('/', async (req, res) => {
    const data = await User.findAll()
    res.status(200).send(data)
})

router.get('/:id', async (req, res) => {
    const data = await User.findByPk(req.params.id)
    if (!data) {
        res.status(404).send(`This User ${req.params.id} doesn't exist!`)
        return
    }
    res.send(data)
})

router.delete('/:id', async (req,res) => {
    const deleted = await User.destroy({ 
        where: {
            id: req.params.id
        }
    })
    if (!deleted) {
        res.status(404).send(`There is no User with an id ${req.params.id}.`)
        return
    }
    res.status(202).send(`User with id ${req.params.id} was deleted.`)
})


router.post('/', async (req,res) => {
    try {
        await User.create(req.body)
        res.sendStatus(201)
        } catch(error) {
            res.status(400).send(error.errors)
        }
        logTable(User)
})


router.put('/:id', async (req,res)=> {
    const userToUpdate = await User.findByPk(req.params.id)

    if (!userToUpdate) {
        res.sendStatus(404)
        return
    }
    try {
        await userToUpdate.update(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.status(400).send(error.errors)
    }

    logTable(User)
})


module.exports = router