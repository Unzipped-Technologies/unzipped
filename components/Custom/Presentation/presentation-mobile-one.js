import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BookService from '../Booking/Book-services';

const MobileOne = () => {
    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="section-one-container">
                <BookService />
                <div className="text-container-main">
                    <span>
                        Eliminate the stress of having a car and be one step closer to freedom.
                    </span>
                    <br />
                    <span>
                        Because some of life’s best moments begin with, ‘I’ll drive.’
                    </span> 
                </div>
                <div className="button-container">
                    <Link href="/how-it-works">
                    <button className="learn-more-button">
                        Learn More
                    </button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MobileOne;