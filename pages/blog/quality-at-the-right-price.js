import React from 'react';
import NoLogo from '../../components/Navbar/PurpleNav';
import Head from "next/head";
import BlogContent from '../../components/Custom/Blog-content';
import Footer from '../../components/Footer/alt-footer';

const Blog = () => {

    const data = [
        {
            type: 'title',
            content: `Quality at the Right Price`,
        },
        {
            type: 'title-2',
            content: `The reason we started Vohnt can be summed up in one simple sentence: Getting your car detailed sucks; it's inconvenient and expensive.`,
        },
        {
            type: 'title-2',
            content: `Our first question was, ‘Why’? 

            Why is getting a car detailed so expensive? We came up with a few reasons: `,
        },
        {
            type: 'numbered',
            content: `1) Process. `,
        },
        {
            type: 'paragraph',
            content: `The industry has never been challenged to ‘go faster’ because the answer has always been - ‘It’s not that easy. It’s not that simple. Quality takes time’ 
            `,
        },
        {
            type: 'numbered',
            content: `2) Products. `,
        },
        {
            type: 'paragraph',
            content: `It’s just business, right? A company buys quality products, and they add their margin on top of that to make the numbers work, right? Wrong. The industry has hid for years behind the sentence, 'We use the best products on the market,' as their reasoning for their astronomical prices. 
            We tested hundreds of ECO-FRIENDLY, and QUALITY products and discovered one thing: Consumers have been charged ridiculous rates in the spirit of 'more margin'. 
            `,
        },
        {
            type: 'numbered',
            content: `3) Lack of innovation.`,
        },
        {
            type: 'paragraph',
            content: `For decades the concept of having a car detailed has been the same. You drop your car off at a local car-detailer, they keep it for a day or two, and in turn charge you $200-$500 for a 'quality, professional' detail.
            `,
        },
        {
            type: 'paragraph',
            content: `Because the consumer never challenged the idea, or the price, it has not pushed the industry to innovate. Sure, some of us said, ‘Fine, I’ll just do it myself,’ but for most of us, this just meant detailing your car once a year when it gets really, really dirty. 
            `,
        },
        {
            type: 'title-2',
            content: `We sat back and came to one resounding conclusion: YOU DESERVE BETTER.`,
        },
        {
            type: 'numbered',
            content: `1) Process. `,
        },
        {
            type: 'paragraph',
            content: `We hired a race-car pit-crew to redevelop the operational process of having a car detailed. We can do it faster than anyone on the market, with top-tier quality, allowing us to divert those savings to the consumer (aka, YOU). `,
        },
        {
            type: 'numbered',
            content: `2) Products.`,
        },
        {
            type: 'paragraph',
            content: `We found the highest quality, eco-friendly, products available on the market and realized one thing: These are not as expensive as car-detailing shops are charging for. We recognized that if we could tack on additional savings for the consumer, you might just get your car detailed more often, and it’s a win-win for both of us. `,
        },
        {
            type: 'numbered',
            content: `3) Innovation.`,
        },
        {
            type: 'paragraph',
            content: `We realized that not only was the process out-dated and slow, not only was the cost of the products being inflated, but the model of HOW a detail actually took place was also out-dated. Why should we take time away from you when your car sits for so many hours each day?`,
        },
        {
            type: 'paragraph',
            content: `We clean your car on its time, not yours. That’s right, your car can be cared for during the day, when you’re at work, or during the night, when you’re getting your beauty sleep, all at the tap of a button.`,
        },
        {
            type: 'paragraph',
            content: `At Vohnt, we’re passionate about saving you time, money, and the environment. If you’d like to learn more about our process, or book your first appointment, click here.`,
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
                <BlogContent data={data} prelink={'/blog/vohnt-mission'} nextlink={'/blog/unmatched-convenience'} prev={'Vohnt Mission'} next={'Unmatched Convenience'}/>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Blog;