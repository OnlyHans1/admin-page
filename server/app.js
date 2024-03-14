var createError = require('http-errors')
var express = require('express')
var cors = require('cors')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var dashboardRouter = require('./routes/dashboard')
var addRouter = require('./routes/add')
var invoiceRouter = require('./routes/invoice')
var reportRouter = require('./routes/report')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', dashboardRouter)
app.use('/add', addRouter)
app.use('/invoice', invoiceRouter)
app.use('/report', reportRouter)

var port = normalizePort(process.env.PORT || '3000')
app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost: ${port}`)
)

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

module.exports = app
