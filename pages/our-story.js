import React from 'react';
import Head from "next/head";
import NoLogo from '../components/Navbar/PurpleNav';
import BlogContent from '../components/Custom/Blog-content';
import Footer from '../components/Footer/alt-footer';
import Testimonials from '../components/Custom/Testimonials';

const OurStory = () => {

    const data = [
        {
            type: 'title-center',
            content: `Our Journey to Revolutionize the car care and service Industry `,
        },
        {
            type: 'paragraph',
            content: `It all started with a simple call. Ethan called Andrew and said, “Why do I have to spend so much time taking care of my car?” Andrew didn’t have a very good answer other than, “I’m not sure, but it gives me anxiety just thinking about it. I have an unlimited car wash pass and I only use it once a month, maybe.” 
            We started this company by asking ourselves, ‘Why can’t things be different?” Too long has the car care and service industry stolen our precious time from us. We realized that you shouldn’t have to sacrifice a lunch break to wash your car; you shouldn’t have to sacrifice a Saturday afternoon to have your car detailed or have your oil changed. It also shouldn’t cost you your next paycheck. `,
        },
        {
            type: 'title-2',
            content: `Our Model`,
        },
        {
            type: 'paragraph',
            content: `The problem with the car washing, car detailing, and car service industry is their model. In the past, you traded quality for the inconvenience. We set out to change that. Quality and convenience are the new gold standard, and you shouldn’t pay for a company’s inefficiencies.  
            The Vohnt model is revolutionizing the car care and service industry by removing all inefficiencies, inconveniences, and focusing on the most important part of the process: YOU.`,
        },        
    ]


    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Our Story | Unzipped</title>
            <meta name="Our Story | Unzipped" content="We're on a mission to change the Carcare industry, and we want you to join us. Follow our journey to change a billion dollar industry."/>
            </Head>
            <div className="center-page-content">
                <NoLogo />
                <BlogContent data={data} prelink={''} nextlink={''} prev={'first'} next={'last'}/>
            </div>
            <div className="container-testimonial">
                <Testimonials />
                {/* <Test /> */}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default OurStory;