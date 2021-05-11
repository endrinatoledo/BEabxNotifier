const HttpStatus = require('http-status-codes')
const PropertiesReader = require('properties-reader')
const Sequelize = require('sequelize')
let models = require('../models')
const properties = PropertiesReader(`./src/bin/common.properties`)

function getConfiguration(req, res, next){
    models.configurationsModel.findOne({
        where: {
          conId:req.params.conId
        }
      }).then(configuration=>{
        message = properties.get('message.agr.res.okCreated')
        res.status(HttpStatus.OK).json({ configuration })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

}

function getAllConfiguration(req, res, next){
    models.configurationsModel.findAll({
      }).then(configurations=>{
        message = properties.get('message.agr.res.okCreated')
        res.status(HttpStatus.OK).json({ configurations })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

}

function addConfiguration(req, res, next){
    models.configurationsModel.create({
      products: req.body.products,
      type: req.body.type,
    }).then(configuration=>{
        message = properties.get('message.con.res.okCreated')
        res.status(HttpStatus.OK).json({ message, configuration })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
        }
      )
}

function updateConfiguration(req, res, next){
    models.configurationsModel.findOne({
        where: {
            conId:req.params.conId
        }
      }).then(configuration=>{
        if(configuration){
            configuration.update({
                prdocuts: (req.body.prdocuts != null && req.body.prdocuts !== '') ? req.body.prdocuts : configuration.prdocuts,
                type: (req.body.type != null && req.body.type !== '') ? req.body.type : configuration.type,
            })
            .then(configuration=>{
                message = properties.get('message.con.res.conUpdated')
                res.status(HttpStatus.OK).json({ message, configuration })

            },(err)=>{
                message = properties.get('message.res.errorInternalServer')
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
                next(err)
            }
            )
        }else
        {
            message = properties.get('message.con.res.notDataToUpdate')
            res.status(HttpStatus.OK).json({ message})
        }

      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )
}
function deleteConfiguration(req, res, next){
    models.configurationsModel.destroy({
        where: {
          products:req.params.products
        }
      }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          let message ="configuracion  eliminada exitosamente";
          res.status(HttpStatus.OK).json({message})
        } else {
          const err = new Error('No se pudo eliminar la configuracion')
          err.status = HttpStatus.NOT_FOUND

          return next(err)
        }
      }, (err) => next(err))
        .catch((err) => next(err))

    
}

module.exports = {
    getConfiguration,
    getAllConfiguration,
    addConfiguration,
    updateConfiguration,
    deleteConfiguration
}
  