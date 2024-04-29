const { prisma } = require("../../utils/prisma");
const { error, success } = require("../../utils/response");
var express = require('express')
var router = express.Router()
const purchasableModel = require('../models/purchasable.models')
const purchasableSubTypeModel = require('../models/purchasableSubType.models')
const multer = require("multer");
const crypto = require('crypto');
const path = require('path');

//Start Multer
const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/assets/items')
    },
    filename: (_req, file, cb) => {
        crypto.pseudoRandomBytes(16, (_err, raw) => {
            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            req.fileValidationError = 'Only image file are allowed'
            cb(null, false)
            return
        }
        cb(null, true)
    }
})
//End Multer

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

router.post('/:ident', upload.single('image'), async (req, res) => {
    const { ident } = req.params
    try{
        if(req.file) req.body.image = convertFilesToURL(req.file.path)
        const data = await purchasableModel(ident, req.body)
        return data
    }catch(err){
        return error(res, err.message)
    }
})

module.exports = router