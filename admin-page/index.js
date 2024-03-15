const express = require('express')

var app = express()
app.use(express.json())
app.use(express.static('public'))

app.get("/admin", (req, res, next) => {
    console.log('Hello')
    next()
}, (req, res) => {
    res.send('Welcome to the admin page!')
})

app.use((err, req, res, next) => {
    console.log(err)
})

const PORT = process.env.PORT || 3000; // Port default adalah 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});