const News = require('./getNewsData');
const AccountNotificationJob = require('./UpdateAccountNotiyJob');

const initScheduledJobs = () => {
    News.getNewsData();
    AccountNotificationJob.UpdateAccountNotiyJob(),
    AccountNotificationJob.UpdateAccountNotiyJobOnceInMonth()
}

module.exports = {
    initScheduledJobs
}