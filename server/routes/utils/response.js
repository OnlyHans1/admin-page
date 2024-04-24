const success = (res, message, data, status = 200) => {
    return res.status(status).json({
        success: true,
        message, data
    })
}

const error = (res, message, status = 404) =>  {
    res.status(status).json({ 
        success: false, message
    })
}

module.exports  = { success, error }