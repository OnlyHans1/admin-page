const router = require("../..");
const { success, error } = require("../../utils/response");

router.post('/contents/:id?', async (req, res) => {
    try {

    } catch (err) {
        return error(res, err.message)
    }
})

module.exports = router