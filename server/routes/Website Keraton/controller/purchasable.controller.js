const { prisma } = require("../../utils/prisma");
const { error, success } = require("../../utils/response");
var express = require('express')
var router = express.Router()
const purchasableModel = require('../models/purchasable.models')
const purchasableSubTypeModel = require('../models/purchasableSubType.models')

router.get('/booking', async (req, res) => {
    try {
        const purchasable = await purchasableSubTypeModel.getAll()
        return success(res, 'Success', purchasable)
    } catch (err) {
        return error(res, err.message)
    }
})

router.get('/:id?', async (req, res) => {
    const { id } = req.params
    try {
        const data = id ? await purchasableModel.getAll(req.query) : await eventModel.getOne(+id)
        return data
    } catch (err) {
        return error(res, err.message)
    }
})

module.exports = router