const express = require('express')
const PropertiesReader = require('properties-reader')
const configurationsController = require('../controllers/configurationsController')
const configurationRouter = express.Router()
const properties = PropertiesReader('./src/bin/common.properties')

const uriConfiguration = properties.get('routes.api.configuration')
const uriConfigurationByProducts = properties.get('routes.api.configurationByProducts')

configurationRouter.route(uriConfiguration)
    .get(configurationsController.getConfiguration)
    .post(configurationsController.addConfiguration)
    .put(configurationsController.updateConfiguration)

configurationRouter.route(uriConfigurationByProducts)
    .delete(configurationsController.deleteConfiguration)

module.exports = configurationRouter