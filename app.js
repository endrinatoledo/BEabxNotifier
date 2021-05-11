'use strict'

require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const winston = require('winston')

const PropertiesReader = require('properties-reader')
const properties = PropertiesReader("./src/bin/common.properties")

const version = properties.get('routes.api.version')
// Import routes
const emailRoutes = require('./src/routes/email.routes')
const configurationRoutes = require('./src/routes/configurationRouter')
const notificationsRoutes = require('./src/routes/notificationRouter')



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

if (process.env.NODE_ENV !== 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

// Setting up express app.
const app = express()

// Express middleware
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Express routes
app.use(version, emailRoutes)
app.use(version, configurationRoutes)
app.use(version, notificationsRoutes)


app.listen(process.env.PORT || 3002, function () {
    console.log('Express app listening on port 3002')
})
