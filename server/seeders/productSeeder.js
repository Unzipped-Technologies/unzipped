// run this seeder with `node server\seeders\productSeeder.js`
const mongoose = require('mongoose');
const Product = require('../../models/Product');
const keys = require('../../config/keys');

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const seedProducts = [
    // basic subscriptions
    {
        name: "Unzipped Basic Monthly",
        description: "Unzipped basic subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08VCrcApbmV0d",
        stripePriceId: "price_1MG8EoHVpfsarZmBMGrql9pE",
        price: 29,
        subscriptionType: 1,
        paymentFrequency: 0,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png",
        isRecurring: false
    },
    {
        name: "Unzipped Basic Yearly",
        description: "Unzipped basic subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08VCrcApbmV0d",
        stripePriceId: "price_1MG9XoHVpfsarZmBhmLo6Tvd",
        price: 278.4,
        subscriptionType: 1,
        paymentFrequency: 1,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png",
        isRecurring: false,
    },
    {
        name: "Unzipped Basic Bi Yearly",
        description: "Unzipped basic subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08VCrcApbmV0d",
        stripePriceId: "price_1MG9XoHVpfsarZmB1J0jczKh",
        price: 522,
        subscriptionType: 1,
        paymentFrequency: 2,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png"
    },
    {
        name: "Unzipped Basic Monthly",
        description: "Unzipped basic subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08VCrcApbmV0d",
        stripePriceId: "price_1MG9XoHVpfsarZmBVZjBc85r",
        price: 730.8,
        subscriptionType: 1,
        paymentFrequency: 3,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png"
    },
    // standard subscriptions
    {
        name: "Unzipped Standard Monthly",
        description: "Unzipped Standard subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08YQOXrZQxzWf",
        stripePriceId: "price_1MG8GwHVpfsarZmB2agKGM4G",
        price: 79,
        subscriptionType: 1,
        paymentFrequency: 0,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png",
        isRecurring: false
    },
    {
        name: "Unzipped Standard Yearly",
        description: "Unzipped Standard subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08YQOXrZQxzWf",
        stripePriceId: "price_1MG9aUHVpfsarZmBBFPIffCl",
        price: 758.4,
        subscriptionType: 1,
        paymentFrequency: 1,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png",
        isRecurring: false,
    },
    {
        name: "Unzipped Standard Bi Yearly",
        description: "Unzipped Standard subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08YQOXrZQxzWf",
        stripePriceId: "price_1MG9aVHVpfsarZmBmAgwzi11",
        price: 1422,
        subscriptionType: 1,
        paymentFrequency: 2,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png"
    },
    {
        name: "Unzipped Standard Monthly",
        description: "Unzipped Standard subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08YQOXrZQxzWf",
        stripePriceId: "price_1MG9aVHVpfsarZmBtPHegGkG",
        price: 1990.8,
        subscriptionType: 1,
        paymentFrequency: 3,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png"
    },
    // Advanced subscriptions
    {
        name: "Unzipped Advanced Monthly",
        description: "Unzipped Advanced subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08ZaatJDRvaAB",
        stripePriceId: "price_1MG8HtHVpfsarZmBAje27gPY",
        price: 299,
        subscriptionType: 1,
        paymentFrequency: 0,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png",
        isRecurring: false
    },
    {
        name: "Unzipped Advanced Yearly",
        description: "Unzipped Advanced subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08ZaatJDRvaAB",
        stripePriceId: "price_1MG9bdHVpfsarZmBOVkHthPE",
        price: 2870.4,
        subscriptionType: 1,
        paymentFrequency: 1,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png",
        isRecurring: false,
    },
    {
        name: "Unzipped Advanced Bi Yearly",
        description: "Unzipped Advanced subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08ZaatJDRvaAB",
        stripePriceId: "price_1MG9bdHVpfsarZmBWZXTed74",
        price: 5382,
        subscriptionType: 1,
        paymentFrequency: 2,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png"
    },
    {
        name: "Unzipped Advanced Monthly",
        description: "Unzipped Advanced subscription",
        addedBy: "JM",
        stripeProductId: "prod_N08ZaatJDRvaAB",
        stripePriceId: "price_1MG9bdHVpfsarZmBdaodxYZs",
        price: 7534.8,
        subscriptionType: 1,
        paymentFrequency: 3,
        image: "https://res.cloudinary.com/dghsmwkfq/image/upload/v1671319559/Unzipped_3d_imorrg.png"
    },
]

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
}

seedDB().then(() => {
    mongoose.connection.close();
})