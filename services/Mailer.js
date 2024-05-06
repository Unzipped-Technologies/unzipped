const Handlebars = require('handlebars')
const sgMail = require('@sendgrid/mail')
const sgClient = require('@sendgrid/client')
const path = require('path')
const nodemailer = require('nodemailer')
const fileService = require('./fileService')
const keys = require('../config/keys')
const User = require('../server/models/User')

sgMail.setApiKey(keys.sendGridKey)
sgClient.setApiKey(keys.sendGridKey)

const send = async data => {
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

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      pool: true,
      maxMessages: 100,
      maxConnections: 10,
      auth: {
        user: 'apikey',
        pass: keys.sendGridKey
      }
    })

    // send mail with defined transport object
    const info = await transporter.sendMail(msg)

    return 1
  } catch (e) {
    console.log('error', e)
  }
}

const randNum = () => {
  return Math.floor(Math.random() * 90000) + 10000
}

const addContact = async (email, confNum) => {
  const customFieldId = await this.getCustomFieldID('conf_num')
  const data = {
    contacts: [
      {
        email: email
      }
    ]
  }
  data.contacts[0].custom_fields[customFieldId] = confNum
  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: data
  }
  return sgClient.request(request)
}

const getCustomFieldID = async customFieldName => {
  const request = {
    method: 'GET',
    path: '/v3/marketing/field_definitions'
  }

  const response = await sgClient.request(request)
  const allCustomFields = response[1].custom_fields
  return allCustomFields.find(x => x.name === customFieldName).id
}

const sendMailWithSG = async (params) => {
  const { email, templateName } = params;
  let userName = '';
  if (!email) return 'Email is required';
  const existingUser = await User.findOne({ email })

  try {
    if (templateName === "VERIFY_EMAIL_ADDRESS" && existingUser) {
      if (existingUser.googleId) {
        return { isLoginWithGoogle: true }
      }
    }

    if (existingUser?.FirstName || existingUser?.LastName) {
      userName = `${existingUser?.FirstName} ${existingUser?.LastName}`;
    } else {
      userName = email.split('@')[0];
    }
    const { templateId, dynamicTemplateData } = getTemplateDetails(templateName, userName, existingUser);

    const msg = {
      to: email,
      from: {
        name: keys.sendGridName,
        email: keys.sendGridEmail
      },
      templateId,
      dynamicTemplateData
    }

    return await sgMail.send(msg)

  }
  catch (error) {
    throw new Error(error.message)
  }
}

const getTemplateDetails = (templateName, userName, existingUser) => {
  switch (templateName) {
    case 'VERIFY_EMAIL_ADDRESS':
      return {
        templateId: 'd-2c0cc93195e149109d032d0c65cab3ba',
        dynamicTemplateData: {
          firstName: userName,
          lastName: '',
          verifyLink: `${keys.redirectDomain}/verified/${existingUser._id}`
        }
      }
    case 'RESET_PASSWORD':
      return {
        templateId: 'd-2b57dce0f9b44b17b89eff2f34969822',
        dynamicTemplateData: {
          firstName: userName,
          lastName: '',
          dashboardLink: `${keys.redirectDomain}/dashboard`,
        }
      }

    default:
      break;
  }
}


module.exports = {
  send,
  randNum,
  addContact,
  getCustomFieldID,
  getTemplateDetails,
  sendMailWithSG
}
