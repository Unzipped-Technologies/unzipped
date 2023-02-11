const News = require('./getNewsData');

const initScheduledJobs = () => {
    News.getNewsData();
}

module.exports = {
    initScheduledJobs
}