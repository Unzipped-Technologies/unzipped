import React from 'react';
import NoLogo from '../../components/Navbar/PurpleNav';
import Head from "next/head";
import BlogContent from '../../components/Custom/Blog-content';
import Footer from '../../components/Footer/alt-footer';

const Blog = () => {

    const data = [
        {
            type: 'title',
            content: `Our Mission to Redefine Carcare`,
        },
        {
            type: 'paragraph',
            content: `In the age of innovation, convenience, and technology, there is an app, a service, or video for almost every single task imaginable. You can find affordable rides, trade goods or services, purchase a new laptop, all from the palm of your hand. 
            \n
            Unfortunately, one industry has fallen behind. We started Vohnt with the core concept that it should not be inconvenient and expensive to keep your car clean. The car detailing industry has never been challenged by consumers to be better, and it is failing you.
            \n
            We believed that you and your car deserved better. Taking on a multi-billion dollar industry is never an easy task, but it's one that needed to happen, and we want you to join us in this revolution. 
            `,
        },
        {
            type: 'title-2',
            content: `At Vohnt we have 3 core pillars that we abide by: `,
        },
        {
            type: 'bullet',
            content: `Quality at the right price`,
        },
        {
            type: 'paragraph',
            content: `The consumer should not have to pay for the industries’ inefficiencies. `,
        },
        {
            type: 'bullet',
            content: `Redefined convenience `,
        },
        {
            type: 'paragraph',
            content: `You should not have to sacrifice hours out of your day without a car for it to be cleaned.  With our model, a touch of a button allows you to get your car cleaned on its time, not yours.`,
        },
        {
            type: 'bullet',
            content: `Environmentally responsible`,
        },
        {
            type: 'paragraph',
            content: `Convenience doesn’t have to come at a high cost to you or the environment. We care about you, your car, and the places you’re driving. We refuse to sacrifice any one of those things for more profit margin.
            \n
            Vohnt is embarking on a journey to redefine the Carcare industry, and we want you to join us for the ride. `,
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
                <div className="mobile-nav-blog">
                <NoLogo />
                </div>
                <BlogContent data={data} prelink={''} nextlink={'/blog/quality-at-the-right-price'} prev={'first'} next={'Quality at the right price'}/>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Blog;