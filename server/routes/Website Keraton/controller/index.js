const router = require("../..");
const controlContent = require('../controller/contents.controller')
const controlPage = require('../controller/pages.controller')
const controlSubPage = require('../controller/subpages.controller')

router.use('/content', controlContent)
router.use('/page', controlPage)
router.use('/sub-page', controlSubPage)
router.use('/auth')

module.exports = router