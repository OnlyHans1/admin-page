var express = require('express')
var router = express.Router()
const { error, success } = require("../../utils/response");
const eventModel = require('../models/events.models');

router.post('/page', async (req, res) => {
    try{
        const data = await eventModel.getAll(req.body)
        return success(res, 'Success', data)
    }catch(err){
        return error(res, err.message)
    }
})
router.get('/:id?', async (req, res) => {
    const { id } =  req.params
    try{
        const data = id ? await eventModel.getOne(+id) :  await eventModel.getAll()
        return success(res, 'Success', data)
    }catch(err){
        return error(res, err.message)
    }
})


module.exports = router