import React from 'react';
import Head from 'next/head';
import PresentationComp from './Presentation-section-one-elm';
import Link from 'next/link';
import Image from 'next/image';

const SectionOne = () => {

    const data = [
        {
            title: "DEVELOPMENT SERVICES",
            content: [
                {
                    image: `TouchlessWash.png`,
                    link: '/services',
                    number: 1,
                    name: 'REACT'
                },
                {
                    image: `Vohnt-Interior.png`,
                    link: '/services',
                    number: 2,
                    name: 'NODE'
                },
                {
                    image: `ExteriorDetail.jpg`,
                    link: '/services',
                    number: 5,
                    name: 'AWS'
                },
                  ],
            link: '/services'
        },
        {
            content: [
                {
                    image: `4`,
                    link: '/services',
                    number: 4,
                    name: 'UI/UX'
                },
                {
                    image: 5,
                    link: '/services',
                    number: 3,
                    name: 'CI/CD'
                },
                {
                    image: `TirePressure.png`,
                    link: '/services',
                    number: 6,
                    name: 'WEB 3'
                },
                  ],
            link: '/services'
        }
    ]
    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="section-one-container">
                {data.map((item, index) => {
                    return <PresentationComp key={index} title={item.title} content={item.content} link={item.link}/>
                })}
                <div className="text-container-main">
                    <span>
                        Eliminate the stress of having finding developers and be one step closer to freedom.
                    </span>
                    <br />
                    <span>
                        Because some of life’s best moments begin with, ‘That should be an app’
                    </span> 
                </div>
                <div className="button-container" id="button-one">
                    <Link href='/how-it-works'>
                    <button className="learn-more-button">
                        Learn More
                    </button>
                    </Link>
                </div>
            </div>

        </React.Fragment>
    )
}

export default SectionOne;