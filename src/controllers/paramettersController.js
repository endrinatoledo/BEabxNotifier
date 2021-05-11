const HttpStatus = require('http-status-codes')
const PropertiesReader = require('properties-reader')
const Sequelize = require('sequelize')
const models = require('../models')
const properties = PropertiesReader('./src/bin/common.properties')
const Op = Sequelize.Op

function getParametter(req, res, next){
    models.paramettersModel.findOne({
        where: {
            parId:req.params.parId
        }
      }).then(parametter=>{
        message = properties.get('message.par.res.okCreated')
        res.status(HttpStatus.OK).json({ parametter })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

}

function getAllParametter(req, res, next){
    models.paramettersModel.findAll({
      }).then(parametter=>{
        message = properties.get('message.par.res.okCreated')
        res.status(HttpStatus.OK).json({ parametter })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )
}


function addParametter(req, res, next){
    models.paramettersModel.create({
      conId: req.body.conId,
      value: req.body.value,
      code: req.body.code
    }).then(parametter=>{
        message = properties.get('message.par.res.okCreated')
        res.status(HttpStatus.OK).json({ message, parametter })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
        }
      )
}

function updateParametter(req, res, next){
    models.paramettersModel.findOne({
        where: {
            parId:req.params.parId
        }
      }).then(parametter=>{
        if(parametter){
            parametter.update({
                conId: (req.body.conId != null && req.body.conId !== '') ? req.body.conId : parametter.conId,
                value: (req.body.value != null && req.body.value !== '') ? req.body.value : parametter.value,
                code: (req.body.code != null && req.body.code !== '') ? req.body.code : parametter.code
    
            })
            .then(parametter=>{
                message = properties.get('message.par.res.notUpdated')
                res.status(HttpStatus.OK).json({ message, parametter })

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
function deleteParametter(req, res, next){
    models.paramettersModel.destroy({
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

module.exports = {
    getParametter,
    getAllParametter,
    addParametter,
    updateParametter,
    deleteParametter

}
  