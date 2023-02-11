const Mailer = require('../../services/Mailer');
const emailList = require('../../models/EmailList');

const sendIntro = async (email) => {
    try {
        const msg = {
            toAddress: email || 'jaymaynard84@gmail.com',
            from: 'jason@unzipped.io',
            subject: 'Welcome to the unzipped newsletter',
            html: 'newsletterIntro.html',
        }
        Mailer
            .send(msg)
            .then(() => {
            console.log('Email sent')
            })
            .catch((error) => {
            console.error(error)
            })
        } catch (e) {
        // logger.info(`******** Email error log ******${JSON.stringify(msgToLog, null, 2)}*********`)
        }
}

const unsubscribeNewsletter = async (data) => {
    return await emailList.findOneAndUpdate({email: data}, {$set: {isActive: false}})
}

module.exports = {
    sendIntro,
    unsubscribeNewsletter
}