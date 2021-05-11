"use strict";
const nodemailer = require('nodemailer');
const templatesEmail = require('../data/templates')
const {ReplaceVariables} = require('../utils/replaceVariables')
const password = require('../utils/encryptPassword');
const ReplaceVariablesT = require('../utils/replaceVariables')

// async..await is not allowed in global scope, must use a wrapper

function createTransportAndSendMail(params, options) {
  try {
    let transporter = nodemailer.createTransport({
      service: params.service,
      host: params.host,
      port: params.port,
      auth: {
        user: params.user,
        pass: password.decrypt(params.pass)
      }
    })
    let newTempate = ReplaceVariables(options.var, options.html);
    transporter.verify((err, res) => {
      if (err) throw err;
      let mailOptions = createMailOption(options.origin, options.to, options.subject, newTempate);
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions).then(res => {
          //console.log(res) -> usenlo si quieren ver la respuesta positiva del message ' response: '250 ok ....'
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      })
    })
  } catch (err) {
    console.log(err)
    throw err;
  }
  // let transporter = nodemailer.createTransport({
  //     // service: params.service,
  //     // host: params.host,
  //     // port: params.port,
  //     // auth: {
  //     //     user: params.user,
  //     //     pass: password.decrypt(params.pass)
  //     // }
  //       host: 'Rocketsv.tech',
  //   port: 587,
  //   secureConnection: true,
  //   auth: {
  //     user: 'rocketsv@rocketsv.tech',
  //     pass: '*RocketSV9102*$_'
  //   },
  //   tls: {
  //     rejectUnauthorized: false
  //   }
  // })
  // let newTempate=ReplaceVariables(options.var,options.html)
  // transporter.verify(function(error, success) {
  //     if (error) {
  //
  //     } else {
  //         let mailOptions = createMailOption(options.origin, options.to, options.subject,  newTempate)
  //         transporter.sendMail(mailOptions)
  //             .then((res) => {
  //                 console.log(res)
  //                 return true
  //             })
  //             .catch(e => {
  //
  //                 return false
  //             })
  //
  //     }
  // });
}

function createTransportAndSendMailAssig(params, options) {
  let transporter = nodemailer.createTransport({
    service: params.service,
    host: params.host,
    port: params.port,
    auth: {
      user: params.user,
      pass: password.decrypt(params.pass)
    }
  })
  let newTempate = ReplaceVariablesT.ReplaceVariablesObj(options.var, options.html)

  transporter.verify(function (error, success) {
    if (error) {

    } else {
      let mailOptions = createMailOption(options.origin, options.to, options.subject, newTempate)
      transporter.sendMail(mailOptions)
        .then((res) => {

          return true
        })
        .catch(e => {

          return false
        })

    }
  });
}

function createTransportAndSendMailMinutes(params, options) {
  let transporter = nodemailer.createTransport({
    service: params.service,
    host: params.host,
    port: params.port,
    auth: {
      user: params.user,
      pass: password.decrypt(params.pass)
    }
  })
  let newTempate = ReplaceVariablesT.ReplaceVariablesObj(options.var, options.html)

  transporter.verify(function (error, success) {
    if (error) {

    } else {
      let mailOptions = createMailOption(options.origin, options.to, options.subject, newTempate)
      transporter.sendMail(mailOptions)
        .then((res) => {

          return true
        })
        .catch(e => {

          return false
        })

    }
  });
}

function createTransportMeetingAttendance(params, options) {

  let transporter = nodemailer.createTransport({
    service: params.service,
    host: params.host,
    port: params.port,
    auth: {
      user: params.user,
      pass: password.decrypt(params.pass)
    }
  })
  let newTempate = ReplaceVariablesT.ReplaceVariablesObj(options.var, options.html)

  transporter.verify(function (error, success) {
    if (error) {

    } else {
      let mailOptions = createMailOption(options.origin, options.to, options.subject, newTempate)
      transporter.sendMail(mailOptions)
        .then((res) => {

          return true
        })
        .catch(e => {

          return false
        })

    }
  });
}

function createMailOption(origin, to, subject, template) {

  return {
    from: origin, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    //text: "ABX", // plain text body
    html: template// html body
  }
}


module.exports = {
  createTransportAndSendMail,
  createTransportAndSendMailMinutes,
  createTransportAndSendMailAssig,
  createTransportMeetingAttendance
}
