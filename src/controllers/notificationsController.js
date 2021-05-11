const HttpStatus = require('http-status-codes')
const PropertiesReader = require('properties-reader')
const Sequelize = require('sequelize')
const models = require('../models')
const properties = PropertiesReader('./src/bin/common.properties')
const Op = Sequelize.Op

function getNotification(req, res, next){
    models.notificationsModel.findOne({
        where: {
            notId:req.params.notId
        }
      }).then(notification=>{
        message = properties.get('message.not.res.okCreated')
        res.status(HttpStatus.OK).json({ notification })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

}

function getAllNotification(req, res, next){
    models.notificationsModel.findAll({
      }).then(notification=>{
        message = properties.get('message.not.res.okCreated')
        res.status(HttpStatus.OK).json({ notification })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )
}

function addNotification(req, res, next){
    models.notificationsModel.create({
      type: req.body.type,
      message: req.body.message,
      status: req.body.status,
      temId: req.body.temId,
      usrId: req.body.usrId,
    }).then(notification=>{
        message = properties.get('message.not.res.okCreated')
        res.status(HttpStatus.OK).json({ message, notification })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
        }
      )
}

function updateNotification(req, res, next){
    models.notificationsModel.findOne({
        where: {
            notId:req.params.notId
        }
      }).then(notification=>{
        if(notification){
            notification.update({
                type: (req.body.type != null && req.body.type !== '') ? req.body.type : notification.prdocuts,
                message: (req.body.message != null && req.body.message !== '') ? req.body.message : notification.message,
                status: (req.body.status != null && req.body.status !== '') ? req.body.status : notification.status,
                temId: (req.body.temId != null && req.body.temId !== '') ? req.body.temId : notification.temId,
                usrId: (req.body.usrId != null && req.body.usrId !== '') ? req.body.usrId : notification.usrId
            })
            .then(notification=>{
                message = properties.get('message.not.res.notUpdated')
                res.status(HttpStatus.OK).json({ message, notification })

            },(err)=>{
                message = properties.get('message.res.errorInternalServer')
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
                next(err)
            }
            )

        }else
        {
            message = properties.get('message.not.res.notDataToUpdate')
            res.status(HttpStatus.OK).json({ message})
        }

      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

    
}

function deleteNotification(req, res, next){
    models.notificationsModel.destroy({
        where: {
            notId:req.params.notId
        }
      }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          let message ="Notificacion eliminada exitosamente";
          res.status(HttpStatus.OK).json({message})
        } else {
          const err = new Error('No se pudo eliminar la Notificacion')
          err.status = HttpStatus.NOT_FOUND

          return next(err)
        }
      }, (err) => next(err))
        .catch((err) => next(err))

    
}

function getAllNotificationUser(req, res, next){
  models.notificationsModel.findAll({
    where: {
      usrId:req.body.id,
      status:'1',
      not_type:'1'}
    })
    .then(notification=>{
        let notificationTemp =notification.length
            if(notificationTemp > 10){
              notificationTemp = +9
            }else{
              notificationTemp
            }
      message = properties.get('message.not.res.oknotificationsUser')
      res.status(HttpStatus.OK).json({ notificationTemp, notification })
    },(err)=>{
      message = properties.get('message.res.errorInternalServer')
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
      next(err)
    }
    )
}

module.exports = {
    getNotification,
    getAllNotification,
    addNotification,
    updateNotification,
    deleteNotification,
    getAllNotificationUser
}
