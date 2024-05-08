const CronJob = require("node-cron");
const UserModel = require("../models/User");
const Mailer = require("../../services/Mailer");
const keys = require("../../config/keys");

const UpdateAccountNotiyJob = () => {
    const scheduledJobFunction = CronJob.schedule("0 0 3 * * *", async () => {
        console.log("UpdateAccountNotiyJob executed on a schedule!");
        try {
            const users = await UserModel.find({
                $and: [
                    { accountUpdateMailCount: { $lt: 3 } },
                    {
                        $or: [
                            { isEmailVerified: false },
                            { isPhoneVerified: false },
                            { isIdentityVerified: false }
                        ]
                    },
                    {
                        $or: [
                            { FirstName: null },
                            { FirstName: '' }
                        ]
                    }
                ]
            }).select('email FirstName LastName');


            if (users && users.length > 0) {
                let mailerCount = 0;
                for (const item of users) {
                    const mailOptions = {
                        to: "mohammed.zubayr10@gmail.com",
                        templateId: "d-2cd6aefc600241718abd22f51a1914cd",
                        dynamicTemplateData: {
                            firstName: item?.FirstName ? item.FirstName : item?.email.split('@')[0],
                            loginLink: `${keys.redirectDomain}/login`,
                            supportLink: `${keys.redirectDomain}/wiki/getting-started`
                        }
                    };

                    const isSuccessfull = await Mailer.sendInviteMail(mailOptions);
                    if (isSuccessfull) {
                        mailerCount += 1;
                        await UserModel.findByIdAndUpdate(item._id, { $inc: { accountUpdateMailCount: 1 } });
                    }

                }

            }
        } catch (error) {
            console.log("Error in UpdateAccountNotiyJob: ", error.message)
        }
    })
    scheduledJobFunction.start();
}

const UpdateAccountNotiyJobOnceInMonth = () => {
    const scheduledJobFunction = CronJob.schedule("0 0 3 * *", async () => {
        console.log("UpdateAccountNotiyJobOnceInMonth executed on a schedule!");
        try {
            const users = await UserModel.find({
                $and: [
                    { accountUpdateMailCount: { $gte: 3 } },
                    {
                        $or: [
                            { isEmailVerified: false },
                            { isPhoneVerified: false },
                            { isIdentityVerified: { $in: ['REJECTED', 'INCOMPLETE'] } }
                        ]
                    }
                ]
            }).select('email FirstName LastName ');

            if (users && users.length > 0) {

                for (const item of users) {
                    const mailOptions = {
                        to: item.email,
                        templateId: "d-2cd6aefc600241718abd22f51a1914cd",
                        dynamicTemplateData: {
                            firstName: item?.FirstName ? item.FirstName : item?.email.split('@')[0],
                            loginLink: `${keys.redirectDomain}/login`,
                            supportLink: `${keys.redirectDomain}/wiki/getting-started`
                        }
                    };
                    await Mailer.sendInviteMail(mailOptions);
                }

            }
        } catch (error) {
            console.log("Error in UpdateAccountNotiyJobOnceInMonth: ", error.message)
        }

    })
    scheduledJobFunction.start();
}

module.exports = {
    UpdateAccountNotiyJob,
    UpdateAccountNotiyJobOnceInMonth
}