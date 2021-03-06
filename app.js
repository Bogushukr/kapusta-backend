const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const { HttpCode } = require('./helpers/constants')
const { authRouter } = require('./routes/api')
const transactionsRouter = require('./routes/api/transactions')
const path = require('path')
const app = express()

// import for DB reports router
const { reportsRouter } = require('./routes/api/')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/transactions', transactionsRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/users', authRouter)


// Using db reports router
app.use('/api/reports', reportsRouter)

app.use((_, res) => {
  res.status(HttpCode.BAD_REQUEST).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res
    .status(err.status || HttpCode.INTERNAL_SERVER_ERROR)
    .json({ message: err.message })
})

module.exports = app
