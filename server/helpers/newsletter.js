const Mailer = require('../../services/Mailer');
const newsletterTemplate = require('../../services/emailTemplates/newsletterIntro');

const sendIntro = async (email) => {
    const msg = {
        to: email,
        recipients: [{email}],
        from: "jason@unzipped.com",
        subject: `Welcome to the unzipped newsletter`,
        html: newsletterTemplate,
      };
    const mailer = new Mailer(msg, newsletterTemplate);
    const confNum = mailer.randNum();
    await mailer.addContact(email, confNum);
    await mailer.send(msg)
    return true;
}

module.exports = {
    sendIntro
}