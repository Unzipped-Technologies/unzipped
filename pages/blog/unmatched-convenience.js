import React from 'react';
import NoLogo from '../../components/Navbar/PurpleNav';
import Head from "next/head";
import BlogContent from '../../components/Custom/Blog-content';
import Footer from '../../components/Footer/alt-footer';

const Blog = () => {

    const data = [
        {
            type: 'title',
            content: `Unmatched Convenience`,
        },
        {
            type: 'paragraph',
            content: `
            In this day and age you can order groceries online and have them delivered to your doorstep the same day; you can buy a pair of shoes and have them the next day; you can order an Uber or Lyft and get anywhere you need to go at the touch of a button. 
            With all of these conveniences, we realized that one industry hadn’t figured out how to tap into true convenience; the Carcare industry. 
            \n
            When you get your car washed or detailed, you are always inconvenienced. Whether that’s taking a full lunch break to drive to and through the car wash; vacuum out your car, and wipe it down, or dropping some quarters in a machine and fighting against time before you lose water pressure.  
            \n
            Even worse, if you want to have your car professionally detailed, you can count on needing a ride and being without your car for 3-5 hours on the weekend. That, or you could have your driveway turned into a makeshift moat so your neighbors can watch your car get cleaned for a few hours. 
            It was time that a change was made, and at Vohnt we set out to make a difference in the industry. Your car should always be cared for on it’s time, not yours. Gone are the days of dropping your car off and waiting for it to be done. 
            \n
            At Vohnt we shifted the model of how things were done. We went to where your car is during the hours you DON’T need it - parking lots and parking garages during the day; hotels and apartment complexes at night. 
            `,
        },
        {
            type: 'title-2',
            content: `Our service is simple: Book, Drop, Clean.`,
        },
        {
            type: 'bullet',
            content: `Book - Choose your service and desired appointment time on our app or website.`,
        },
        {
            type: 'bullet',
            content: `Drop - Leave your keys at one of our serviced parking garages in our Vohnt box, or with the front desk of your hotel or apartment complex. One of our certified drivers will pick your car up within 15 minutes and deliver it to our Cloud Service Location (less than 1 mile away).`,
        },
        {
            type: 'bullet',
            content: `Clean - Your car will be back in the same parking spot that you left it by the end of the workday, or if you use our service through your hotel or apartment, it’ll be serviced overnight and back first thing in the morning when you’re ready to leave.`,
        },
        {
            type: 'paragraph',
            content: `
                At Vohnt we keep it simple: Quality, professionally done car-detailing for $99, done on your car's time, not yours. 
                Focus on what matters most to you, and we’ll worry about keeping your car in the best condition it's ever been. 
            `,
        },
        
    ]


    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Unzipped | Blog</title>
            <meta name="keywords" content="Unzipped"/>
            </Head>
            <div className="center-page-content">
                <NoLogo />
                <BlogContent data={data} prelink={'/blog/quality-at-the-right-price'} prev={'Quality at the right price'} next={'last'}/>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Blog;