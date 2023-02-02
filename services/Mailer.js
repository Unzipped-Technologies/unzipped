const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const keys = require('../config/keys');
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;


sgMail.setApiKey(keys.sendGridKey);
sgClient.setApiKey(keys.sendGridKey);


class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('jason@unzipped.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });
  
      const response = await this.sgApi.API(request);
      return response;
    } catch (e) {
      console.log('error', e)
    }
  }

  randNum() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  async addContact(email, confNum) {
    const customFieldId = await this.getCustomFieldID('conf_num');
    const data = {
      "contacts": [{
        "email": email,
      }]
    };
    data.contacts[0].custom_fields[customFieldId] = confNum;
    const request = {
      url: `/v3/marketing'contacts`,
      method: 'PUT',
      body: data
    }
    return sgClient.request(request)
  }

  async getCustomFieldID(customFieldName) {
    const request = {
      method: 'GET',
      path: '/v3/marketing/field_definitions'
    };

    const response = await sgClient.request(request);
    const allCustomFields = response[1].custom_fields;
    return allCustomFields.find(x => x.name === customFieldName).id;
  }
}

module.exports = Mailer;
