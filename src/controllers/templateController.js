const HttpStatus = require('http-status-codes')
const PropertiesReader = require('properties-reader')
const Sequelize = require('sequelize')
const models = require('../models')
const properties = PropertiesReader('./src/bin/common.properties')

function getTemplate(req, res, next){
    models.templatesModel.findOne({
        where: {
            temId:req.params.temId
        }
      }).then(template=>{
        message = properties.get('message.tem.res.okCreated')
        res.status(HttpStatus.OK).json({ template })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

}


function addTemplate(req, res, next){
    models.templatesModel.create({
     products: req.body.products,
     actions: req.body.actions,
     subject: req.body.subject,
     body: req.body.body,
     status: req.body.status
    }).then(template=>{
        message = properties.get('message.tem.res.okCreated')
        res.status(HttpStatus.OK).json({ message, template })
      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
        }
      )
}

function updateTemplate(req, res, next){
    models.templatesModel.findOne({
        where: {
            temId:req.params.temId
        }
      }).then(template=>{
        if(template){
            template.update({
                products: (req.body.products != null && req.body.products !== '') ? req.body.products : template.products,
                actions: (req.body.actions != null && req.body.actions !== '') ? req.body.actions : template.actions,
                subject: (req.body.subject != null && req.body.subject !== '') ? req.body.subject : template.subject,
                body: (req.body.body != null && req.body.body !== '') ? req.body.body : template.body,
                status: (req.body.status != null && req.body.status !== '') ? req.body.status : template.status
    
            })
            .then(template=>{
                message = properties.get('message.tem.res.temUpdated')
                res.status(HttpStatus.OK).json({ message, template })

            },(err)=>{
                message = properties.get('message.res.errorInternalServer')
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
                next(err)
            }
            )

        }else
        {
            message = properties.get('message.tem.res.notDataToUpdate')
            res.status(HttpStatus.OK).json({ message})
        }

      },(err)=>{
        message = properties.get('message.res.errorInternalServer')
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message })
        next(err)
      }
      )

    
}
function deleteTemplate(req, res, next){
    models.templatesModel.destroy({
        where: {
            temId:req.params.temId
        }
      }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          let message ="template eliminado exitosamente";
          res.status(HttpStatus.OK).json({message})
        } else {
          const err = new Error('No se pudo eliminar el template')
          err.status = HttpStatus.NOT_FOUND

          return next(err)
        }
      }, (err) => next(err))
        .catch((err) => next(err))

    
}

module.exports = {
    getTemplate,
    getAllTemplate,
    addTemplate,
    updateTemplate,
    deleteTemplate

}
  