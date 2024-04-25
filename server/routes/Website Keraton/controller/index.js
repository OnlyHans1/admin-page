var express = require('express')
var router = express.Router()
const controlContent = require('../controller/contents.controller')
const controlPage = require('../controller/pages.controller')
const controlAuth = require('../controller/auth.controller')

router.use('/content', controlContent)
router.use('/page', controlPage)
router.use('/auth', controlAuth)

module.exports = router