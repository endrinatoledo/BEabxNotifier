const express = require('express')
const PropertiesReader = require('properties-reader')
const notificationsController = require('../controllers/notificationsController')
//../bin/common.properties
const notificationRouter = express.Router()
//const properties = PropertiesReader(`${__dirname.split('\\src')[0]}/src/bin/common.properties`)
const properties = PropertiesReader('./src/bin/common.properties')
const uriNotification = properties.get('routes.api.notification')
const uriNotifications = properties.get('routes.api.notifications')
const uriNotificationUser = properties.get('routes.api.notificationUser')

notificationRouter.route(uriNotification)
    .get(notificationsController.getAllNotification)
    .post(notificationsController.addNotification)
    .put(notificationsController.updateNotification)
    .delete(notificationsController.deleteNotification)

notificationRouter.route(uriNotificationUser)
    .post(notificationsController.getAllNotificationUser)

notificationRouter.route(uriNotifications)
    .post(notificationsController.addNotification)

module.exports = notificationRouter
