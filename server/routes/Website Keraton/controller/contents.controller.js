const router = require("../..");
const { throwError } = require("../../utils/helper");
const { success, error } = require("../../utils/response");
const contentModel = require('../models/contents.models')

router.get('/:id?', async (req, res) => {
    const { id } = req.params
    try {
        const data = id ? await contentModel.getOne(+id) : await contentModel.getAll()
        return success(res, 'Get Success', data)
    } catch (err) {
        return error(res, err.message)
    }
})

router.post('/:id', async (req, res) => {
    try {
        const updatedData = await contentModel.update(id, req.body)
        return updatedData
    } catch (err) {
        return error(res, err.message)
    }
})

module.exports = router