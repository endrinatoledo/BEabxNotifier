const HttpStatus = require('http-status-codes')
const PropertiesReader = require('properties-reader')
const properties = PropertiesReader('./src/bin/common.properties')
const Sequelize = require('sequelize')
const templatesEmail = require('../data/templates')
const email = require('../utils/nodemailer')
const encrypEmail = require('../utils/encryptJs')
// const User= require('../../../abx/src/controllers/usersController')
const nodemailer = require('../utils/nodemailer')
let models = require('../models')
let message

const Op = Sequelize.Op

/**
 * Envio de correo
 * @parma origin
 * @parma to  Destinatario del correo
 * @parma subject Asunto del correo
 * @parma product Producto desde el cual se hace la solicitud de envio
 * @parma type Tipo de notificacion
 * */
async function sendEmail(req, res, next) {
  try {
    let {origin, to, email, product, type, actions} = req.body;
    let map = {};
    let options = {
      origin,
      to,
      subject: "",
      html: 0,
      var: req.body.var // no usen palabras reservadas para los nombres obligan a tener que usarlos directamente asi.
    };
    encrypEmail.encrypt(email);
    await models.paramettersModel.findAll({
      attributes: ['par_code', 'par_value'],
      include: [{
        model: models.configurationsModel,
        as: 'configuration',
        attributes: [],
        where: {
          con_products: product,
          con_type: type
        }
      }]
    }).then(dataParameters => {
      dataParameters.map(x => {
        map[x.dataValues.par_code] = x.dataValues.par_value
      });
    }).catch(err => {
      throw err;
    });
    let template = await models.templateModel.findOne({
      attributes: ['temId', 'products', 'actions', 'subject', 'body', 'status', 'conId'],
      include: [{
        model: models.configurationsModel,
        as: 'configuration',
        where: {
          con_products: product
        }
      }],
      where: {
        actions: actions,
      }
    }).catch(err => {
      throw err;
    })
    options.html = template.body;
    options.subject = template.subject;
    nodemailer.createTransportAndSendMail(map, options);
    return res.status(200).json({message: 'el correo se enviara en breve'});
  } catch (err) {
    throw err;
  }

}

function sendEmailMeetingAssi(req, res, next) {

  let listAssi = []
  let meeTitle
  let params = req.body
  let map = {}
  let options = {
    origin: params.origin,
    to: params.to,
    subject: "",
    html: 0,
    var: params.var
  }

  let assi = req.body.var
  assi.forEach(element => {
    objetoassi = element.value
    objetoassi.forEach(element1 => {
      //objetoassi = element1.value
      if (element1.user.email == params.to) {
        listAssi.push({
          assTitle: element1.title,
          assContent: element1.content

        });
        meeTitle = element1.meeting.title
      }
    })
  })
  options.var = {
    meeTitle,
    listAssi
  }

  models.paramettersModel.findAll({
    attributes: ['par_code', 'par_value'],
    include: [{
      model: models.configurationsModel,
      as: 'configuration',
      attributes: [],
      where: {
        con_products: params.product,
        con_type: params.type
      }
    }]
  }).then((parametters) => {
    models.templateModel.findOne({
      attributes: ['par_code', 'par_value'],
      include: [{
        model: models.configurationsModel,
        as: 'configuration',
        attributes: [],
        where: {
          con_products: product,
          con_type: type
        }
      }],
      where: {
        actions: params.actions,
      }

    }).then((template) => {
        options.html = template.body;
        options.subject = template.subject;
        parametters.map(x => {
          map[x.dataValues.par_code] = x.dataValues.par_value
        })
        email.createTransportAndSendMailAssig(map, options)
        message = properties.get('message.res.okData')
        res.status(HttpStatus.OK).json({message})
      }
    )
  }).catch((error) => {
  })


}


function sendEmailMeetingMinutes(req, res, next) {

  let listAssi = []
  let listAgre = []
  let objListAgr = []
  let objListAss = []
  let nameMeeting
  let minutes
  let params = req.body
  let map = {}
  let options = {
    origin: params.origin,
    to: params.to,
    subject: "",
    html: 0,
    var: params.var
  }

  minutes = req.body.var

  minutes.forEach(element => {
    if (element.listAgr) {
      objListAgr = element.listAgr

      objListAgr.forEach(element1 => {
        listAgre.push({
          agrTitle: element1.title,
          agrContent: element1.content
        });
        nameMeeting = element1.meeting.title
      })
    }
    if (element.listAss) {
      objListAss = element.listAss
      objListAss.forEach(element1 => {
        listAssi.push({
          assTitle: element1.title,
          assContent: element1.content
        });
      })
    }

  })

  options.var = {
    listAgre,
    nameMeeting,
    listAssi
  }
  models.paramettersModel.findAll({
    attributes: ['par_code', 'par_value'],
    include: [{
      model: models.configurationsModel,
      as: 'configuration',
      attributes: [],
      where: {
        con_products: params.product,
        con_type: params.type
      }
    }]
  }).then((parametters) => {
    models.templateModel.findOne({
      attributes: ['par_code', 'par_value'],
      include: [{
        model: models.configurationsModel,
        as: 'configuration',
        attributes: [],
        where: {
          con_products: product,
          con_type: type
        }
      }],
      where: {
        actions: params.actions,
      }

    }).then((template) => {
        options.html = template.body;
        options.subject = template.subject;
        parametters.map(x => {
          map[x.dataValues.par_code] = x.dataValues.par_value
        })
        email.createTransportAndSendMailMinutes(map, options)
        message = properties.get('message.res.okData')
        res.status(HttpStatus.OK).json({message})
      }
    )
  }).catch((error) => {
  })
}

function sendEmailMeetingInvitation (req, res, next) {

  let params = req.body
  let map = {}
  let options = {
    origin: params.origin,
    to: params.to,
    subject: "",
    html: 0,
    var: params.var
  }

  options.var = {
    title: options.var[0].title
  }

  models.paramettersModel.findAll({
    attributes: ['par_code', 'par_value'],
    include: [{
      model: models.configurationsModel,
      as: 'configuration',
      attributes: [],
      where: {
        con_products: params.product,
        con_type: params.type
      }
    }]
  }).then((parametters) => {

    models.templateModel.findOne({
      attributes: ['par_code', 'par_value'],
      include: [{
        model: models.configurationsModel,
        as: 'configuration',
        attributes: [],
        where: {
          con_products: product,
          con_type: type
        }
      }],
      where: {
        actions: params.actions,
      }

    }).then((template) => {
        options.html = template.body;
        options.subject = template.subject;
        parametters.map(x => {
          map[x.dataValues.par_code] = x.dataValues.par_value
        })
        email.createTransportMeetingAttendance(map, options)
        message = properties.get('message.res.okData')
        res.status(HttpStatus.OK).json({message})
      }
    )
  }).catch((error) => {
  })

}
 
function sendEmailMeetingAttendance (req, res, next) {

  let params = req.body
  let map = {}
  let options = {
    origin: params.origin,
    to: params.to,
    subject: "",
    html: 0,
    var: params.var
  }

  options.var = {
    title: options.var[0].title,
    group: options.var[0].group
  }

  models.paramettersModel.findAll({
    attributes: ['par_code', 'par_value'],
    include: [{
      model: models.configurationsModel,
      as: 'configuration',
      attributes: [],
      where: {
        con_products: params.product,
        con_type: params.type
      }
    }]
  }).then((parametters) => {
    models.templateModel.findOne({
      attributes: ['par_code', 'par_value'],
      include: [{
        model: models.configurationsModel,
        as: 'configuration',
        attributes: [],
        where: {
          con_products: product,
          con_type: type
        }
      }],
      where: {
        actions: params.actions,
      }

    }).then((template) => {
        options.html = template.body;
        options.subject = template.subject;
        parametters.map(x => {
          map[x.dataValues.par_code] = x.dataValues.par_value
        })
        email.createTransportMeetingAttendance(map, options)
        message = properties.get('message.res.okData')
        res.status(HttpStatus.OK).json({message})
      }
    )
  }).catch((error) => {
  })

}

module.exports = {
  sendEmail,
  sendEmailMeetingAssi,
  sendEmailMeetingMinutes,
  sendEmailMeetingInvitation,
  sendEmailMeetingAttendance
}
