const Mailer = require('../../services/Mailer');
const emailList = require('../../models/EmailList');
const newsSchema = require('../../models/news')
const axios = require('axios')

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

const getNewsStories = async () => {
    const api = 'https://newsdata.io/api/1/news?apikey=pub_16976a4e577fc6388777c9016b241ac7bd06c&q=technology&country=us&language=en&category=business,entertainment,technology,top'
    const news = await axios.get(api)
    console.log(news.data.results)
    await newsSchema.insertMany(news.data.results)
    return news?.data?.results;
}

const _findWithImage = (data) => {
    for (const item of data) {
        if (item?.image_url && item.image_url.includes('https')) {
            const newList = data.filter(e => e._id !== item._id)
            return [item, ...newList]
        }
    }
    return data
}

const retrieveExternalNews = async () => {
    const news = await newsSchema.find().limit(10)
    return _findWithImage(news);
}

module.exports = {
    sendIntro,
    unsubscribeNewsletter,
    getNewsStories,
    retrieveExternalNews
}