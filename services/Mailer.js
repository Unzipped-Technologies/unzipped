const Handlebars = require('handlebars')
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const path = require('path')
const nodemailer = require('nodemailer')
const fileService = require('./fileService')
const keys = require('../config/keys');


sgMail.setApiKey(keys.sendGridKey);
sgClient.setApiKey(keys.sendGridKey);

  const send = async (data) => {
    try {
      const content = fileService.readFile(path.join(__dirname, '/emailTemplates/', data.html)).toString()

      const template = Handlebars.compile(content)
      const html = template(data?.data)
      const msg = {
        to: data.toAddress,
        from: data?.from || 'jason@unzipped.io',
        subject: data.subject,
        html: html,
        attachments: data.attachments,
        bcc: ['jason@unzipped.io']
      }

      if (['uat', 'production'].includes(keys.env) && data?.bcc) {
        msg.bcc = [...(msg?.bcc || []), data?.bcc]
      }

      if (data?.replyTo) {
        msg.replyTo = data.replyTo
      }

      // // filter attachments out of logs due to data buffers being too large for logs
      // const msgToLog = { ...msg, attachments: `${(msg.attachments && msg.attachments.length) || 0} attachments found.` }
      // logger.info(`******** Email Helper after content 5 ******${JSON.stringify(msgToLog, null, 2)}*********`)
      
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        pool: true,
        maxMessages: 100,
        maxConnections: 10,
        auth: {
          user: "apikey",
          pass: keys.sendGridKey
        }
      })

      // send mail with defined transport object
      const info = await transporter.sendMail(msg)
      // logger.info(`******** Email Helper after content 6 ******${JSON.stringify(info, null, 2)}*********`)
      // logger.info(`******** Email Helper Message sent Message id ${info.messageId}  to email ***************${mailOptionsObject.toAddress}`)
      return 1
    } catch (e) {
      console.log('error', e)
    }
  }

  const randNum = () => {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  const addContact = async (email, confNum) => {
    const customFieldId = await this.getCustomFieldID('conf_num');
    const data = {
      "contacts": [{
        "email": email,
      }]
    };
    data.contacts[0].custom_fields[customFieldId] = confNum;
    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      body: data
    }
    return sgClient.request(request)
  }

  const getCustomFieldID = async (customFieldName) => {
    const request = {
      method: 'GET',
      path: '/v3/marketing/field_definitions'
    };

    const response = await sgClient.request(request);
    const allCustomFields = response[1].custom_fields;
    return allCustomFields.find(x => x.name === customFieldName).id;
  }

module.exports = {
  send,
  randNum,
  addContact,
  getCustomFieldID,
};
