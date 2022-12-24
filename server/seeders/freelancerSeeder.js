// run this seeder with `node server\seeders\freelancerSeeder.js`
const mongoose = require('mongoose');
const userHelper = require('../helpers/user')
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const seedFreelancers = [
    // basic subscriptions
    {
        email: "jaymaynard84+1200@gmail.com",
        FirstName: 'Joe',
        LastName: 'Montana',
        password: "Myfirst1",
        role: 1,
        rate: 40.00,
        category: "Developer",
        isEquityAccepted: false,
        profileImage: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_12_k3c5lq.jpg",
        skills: [
            {
                skill: "React",
                yearsExperience: 2
            },
            {
                skill: "NodeJS",
                yearsExperience: 4
            }
        ]
    },
    {
        email: "jaymaynard84+1310@gmail.com",
        FirstName: 'Harry',
        LastName: 'Potter',
        password: "Myfirst1",
        role: 1,
        rate: 45.00,
        category: "Developer",
        isEquityAccepted: false,
        profileImage: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_9_sle98g.jpg",
        skills: [
            {
                skill: "AWS",
                yearsExperience: 2
            },
            {
                skill: "CICD",
                yearsExperience: 4
            }
        ]
    },
    {
        email: "jaymaynard84+1320@gmail.com",
        FirstName: 'Ron',
        LastName: 'Weasley',
        password: "Myfirst1",
        role: 1,
        rate: 75.00,
        category: "Developer",
        isEquityAccepted: false,
        profileImage: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_10_wqef8r.jpg",
        skills: [
            {
                skill: "React",
                yearsExperience: 2
            },
            {
                skill: "Javascript",
                yearsExperience: 4
            }
        ]
    },
    {
        email: "jaymaynard84+1330@gmail.com",
        FirstName: 'John',
        LastName: 'Dutton',
        password: "Myfirst1",
        role: 1,
        rate: 90.00,
        category: "Developer",
        isEquityAccepted: false,
        profileImage: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_11_fxas92.png",
        skills: [
            {
                skill: "React",
                yearsExperience: 2
            },
            {
                skill: "NodeJS",
                yearsExperience: 4
            }
        ]
    },
    {
        email: "jaymaynard84+1340@gmail.com",
        FirstName: 'Carl',
        LastName: 'Sagan',
        password: "Myfirst1",
        role: 1,
        rate: 90.00,
        category: "Developer",
        isEquityAccepted: false,
        profileImage: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_11_fxas92.png",
        skills: [
            {
                skill: "React",
                yearsExperience: 2
            },
            {
                skill: "NodeJS",
                yearsExperience: 4
            }
        ]
    },
    {
        email: "jaymaynard84+1350@gmail.com",
        FirstName: 'Tony',
        LastName: 'Robbins',
        password: "Myfirst1",
        role: 1,
        rate: 30.00,
        category: "Sales",
        isEquityAccepted: false,
        profileImage: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_3_tfkunz.jpg",
        skills: [
            {
                skill: "Cold Calling",
                yearsExperience: 2
            },
            {
                skill: "Networking",
                yearsExperience: 4
            }
        ]
    },
]

const seedDB = async () => {
    //salt password
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    // create freelancer accounts
    for (const freelancer of seedFreelancers) {
        const hash = await bcrypt.hash(freelancer.password, salt);
        await userHelper.createUser(freelancer, hash)
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})