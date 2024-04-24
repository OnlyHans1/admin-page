const { error } = require("../../utils/response")
const { router } = require("../../utils/router")

router.post('/login', async (req, res) => {
    try{
        
    }catch(err){
        return error(res, err.message)
    }
})