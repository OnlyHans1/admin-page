const router = require("../..");
const { throwError } = require("../../utils/helper");
const { success, error } = require("../../utils/response");
const pagesModels = require('../models/pages.models')

router.get('/:id', async (req, res) => {
    let { id } = req.params
    try {
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


module.exports = router