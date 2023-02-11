const CronJob = require("node-cron");

const getNewsData = () => {
  const scheduledJobFunction = CronJob.schedule("0 7 * * *", () => {
    console.log("I'm executed on a schedule!");
    // Add your custom logic here
  });

  scheduledJobFunction.start();
}

module.exports = {
    getNewsData
}