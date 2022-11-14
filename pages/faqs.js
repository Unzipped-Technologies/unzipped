import React, {useState} from 'react';
import NoLogo from '../components/Navbar/No-logo';
import Head from "next/head";
import BlogHeader from '../components/Custom/Blog-header';
import Footer from '../components/Footer/alt-footer';
import FAQCard from '../components/Custom/Faqcard.js';

const FAQS = () => {
    const [focus, setFocus] = useState(false);

    const data = [
        {
            image: 'blog-four.png',
            title: 'Our Mission to Redefine Carcare',
            text: [
                `Our journey to change the Carcare industry.`,
            ],
            link: 'vohnt-mission',
        },
        {
            image: 'blog-two.png',
            title: 'Quality at the Right Price',
            text: [
                `The reason we started Vohnt can be summed up in one simple sentence: Getting your car detailed sucks; it's inconvenient and expensive.`,
            ],
            link: 'quality-at-the-right-price',
        },
        {
            image: 'blog-three.png',
            title: 'Unmatched Convenience',
            text: [
                `There is a convenient option for everything in this day and age. Whether it’s getting groceries delivered, or ordering an Uber. Keeping your car clean should be just as convenient.`,
            ],
            link: 'unmatched-convenience'
        },
    ]

    const FaqData = [
        {
            title: `How does Vohnt work?`,
            content: `
                We clean your car on its time, not yours. That means all you have to do is schedule your appointment, drop your keys at a Vohnt box in a participating downtown parking garage, and we take care of the rest. Our certified driver will pick up the car from the parking garage, bring it to our detailing location (less than 1 mile away), then return it before the end of the work day in the same exact spot you left it. 
            `,
        },
        {
            title: `What if I need my car during a service?`,
            content: `
                We offer an expedited service for users who need their car returned quickly. We ask that you schedule this service if you know you will need it prior to 4pm. 
                \n
                But, things happen. You have an emergency pop up, so what then? No need to worry -  Use our website or app to notify us your immediate need and our process allows us to return your car within 15 minutes of the notification. In these situations, Vohnt cannot guarantee the service will be finished but we do guarantee that your car won’t be covered in soap. Unfortunately Vohnt cannot provide refunds for services cut short by the client. 
            `,
        },
        {
            title: `What are your hours of operation?`,
            content: `
                We offer our services 24 hours a day. For business customers, our services begin at 6a and end at 5p. For our residential customers, our services are 24 hours a day. For our Hotel partners and their customers, we offer expedited services from 6a-5p, and our standard services from 8p-5a.
            `,
        },
        {
            title: `My car is manual, can your drivers handle that?`,
            content: `
                Yes. All of our drivers are trained on both manual and automatic cars. We have an experienced staff that is prepared for every situation.
            `,
        },
        {
            title: `How long does a service take?`,
            content: `
                We are able to fully detail your car, both interior and exterior, in under two hours. The good news is that our model allows you to never need to worry about this. We clean your car when you are at work, and when you are finished, it will be waiting for you, spotless like the day you got it.
            `,
        },
        {
            title: `What type of products will you be using on my car?`,
            content: `
                We are deeply committed to using high quality eco-friendly products There are no excuses for not protecting your safety and the safety of our environment. Every aspect of our process uses top quality products that are environmentally safe, and we reclaim our water through an extensive process allowing us to safely reuse what many would discard as waste. To learn more about our environmental practices and products, click here.
            `,
        },
        {
            title: `Will you charge me more for the size of my car?`,
            content: `
                Good news, regardless of your car, we only charge $99. Our operational process and team are always working for you to provide the service at a price and quality you deserve. 
            `,
        },
        {
            title: `How will I know if my appointment is booked?`,
            content: `
                Once you confirm your appointment, our system will provide you with an email confirmation and receipt, while also sending you a QR code or 4-digit code for you to use when dropping your keys at one of our Vohnt box locations.
            `,
        },
        {
            title: `What if I need to cancel my appointment?`,
            content: `
                We understand that things come up. All we need is a two hour heads up prior to beginning your service. That allows us enough time to return your car and reschedule your appointment. After 2 hours, there will be a $25 cancellation fee charged.
            `,
        },
        {
            title: `How much does Vohnt cost?`,
            content: `
                Vohnt only costs $99 for an interior and exterior package. Everyone should have the luxury of getting their car detailed, and paying $400 for it to be professionally done just wasn’t reasonable. We set out to fix this by hiring a professional pit crew to develop a quality process that is so fast, we’re able to return the hours of labor to you as cost savings, while providing you the best quality service you can find.
            `,
        },
        {
            title: `What if something happens to my car?`,
            content: `
                We have put together an impeccable process for our detail technicians, and all of our Vohnt drivers are thoroughly vetted and background checked, so our goal is for this to never happen. 
                \n
                But, like we said, things can happen. We cover all of our clients’ cars under the best insurance on the market, and as soon as you drop your keys in the Vohnt box, all liability is covered under our insurance. We also take real time photos of every aspect of our service; from pickup, to detail, to drop off. If you notice something has been damaged or is missing, please let us know on our site and we will rectify the situation.
            `,
        },
        {
            title: `How are you keeping me safe during the COVID-19 pandemic?`,
            content: `
                We take your well-being very seriously. Our safety guidelines are located on our ‘Safety’ page here. 
            `,
        },
        {
            title: `When can I book my appointment?`,
            content: `
                You are able to schedule ahead and book at any time based on availability. 
                \n
                For same day service we ask that you have your appointment booked by 10a that day. This allows us to queue your service in our system and finish in time for it to be returned by the end of the work day.
            `,
        },
        {
            title: `How will you get my keys?`,
            content: `
                You are able to schedule ahead and book at any time based on availability. 
                \n
                For same day service we ask that you have your appointment booked by 10a that day. This allows us to queue your service in our system and finish in time for it to be returned by the end of the work day.
            `,
        },
        {
            title: `How safe are the Vohnt boxes?`,
            content: `
                We take the security of your car and your safety seriously. We have 24/7 cameras set up around our Vohnt boxes which are made of secure metal that are tamper resistant. Our boxes are also pressure sensitive and will alert both our team and the Police should someone try to force entry into a box.
            `,
        },
        {
            title: `How do I pay for my service?`,
            content: `
                Everything is done through our website or app. Once you’ve scheduled your appointment, you will be able to pay for the service through our scheduling portal. You will also have the option of creating an account and storing your information for future use. 
                \n
                We use an extensive system to secure all of your personal information and data. This will only be accessed via tokenization when you pay for another service after creating your account. We never share your information, personal data, or credit information. This will not be accessed by anyone on our team at any point. 
            `,
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet"></link>
            <title>FAQs | Unzipped</title>
            <meta name="FAQs | Unzipped" content="We're on a mission to change the Carcare industry, and we want you to join us. Follow our journey to change a billion dollar industry."/>
            </Head>
            <div className="center-page-content">
            <div className="blog-header-faqs">
            <NoLogo />
            </div>
            <BlogHeader data={data} />
            <div className="container-one-hiw">
                <h3 className="faqs-header">FAQs</h3>
                <div className="faqs-container">
                <div>
                    {FaqData.map((item, index) => {
                        return (
                            <>
                            {index <= 7 &&
                            <FAQCard data={item} focus={focus} setFocus={setFocus}/>
                            }
                            </>
                        )
                    })}
                </div>
                <div>
                    {FaqData.map((item, index) => {
                        return (
                            <>
                            {index >= 8 &&
                            <FAQCard data={item} focus={focus} setFocus={setFocus}/>
                            }
                            </>
                        )
                    })}
                </div>
                </div>
            </div>
            </div>
            <div id="move-down">
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default FAQS;