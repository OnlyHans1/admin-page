const { throwError } = require("../../utils/helper");
const { success, error } = require("../../utils/response");
const { expressRouter } = require("../../utils/router");
const pagesModels = require('../models/pages.models')

expressRouter.get('/content/:id', async (req, res) => {
    let { id } = req.params
    try{
        const contents = await pagesModels.getAllContent(+id)
        return success(res, 'Success', contents)
    }catch(err){
        throwError(err)
    }
})

expressRouter.get('/:id?', async (req, res) => {
    let { id } = req.params
    try {
        console.log('sdbhjsdjbhasdbjk')
        const data = id ? await pagesModels.getOne(id) : await pagesModels.getAll()
        return success(res, 'Success', data)
    } catch (err) {
        return error(res, err.message)
    }
})


// router.post('/pages/:id?', async (req, res) => {
//     try{
//         const 
//     }catch(err){
//         return error(res, err.message)
//     }
// })


module.exports = expressRouter