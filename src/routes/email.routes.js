const express = require('express')
const PropertiesReader = require('properties-reader')
const emailController = require('../controllers/email.controller')
const emailRouter = express.Router()
const properties = PropertiesReader('./src/bin/common.properties')
const uriEmail = properties.get('routes.api.email')
const uriEmailMeetingAssi = properties.get('routes.api.emailMeetingAssi')
const uriEmailMeetingMinutes = properties.get('routes.api.emailMeetingMinutes')
const uriEmailMeetingInvitation = properties.get('routes.api.notificationmeetinginvitation')
const uriEmailMeetingAttendance = properties.get('routes.api.notificationmeetingattendance')

emailRouter.route(uriEmail)
    .post(emailController.sendEmail)

emailRouter.route(uriEmailMeetingAssi)
    .post(emailController.sendEmailMeetingAssi)    

emailRouter.route(uriEmailMeetingMinutes)
    .post(emailController.sendEmailMeetingMinutes)    

emailRouter.route(uriEmailMeetingInvitation)
    .post(emailController.sendEmailMeetingInvitation)       
    
emailRouter.route(uriEmailMeetingAttendance)
    .post(emailController.sendEmailMeetingAttendance)  
    

    
module.exports = emailRouter