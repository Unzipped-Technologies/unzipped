import React from 'react';
import Book from './Book-container';
import Link from 'next/link';
import BookSmall from './Book-container-small';
import BookMobile from './Book-mobile';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const BookNow = () => {

    return (
        <React.Fragment>
            <div className="book-container">
                <div className="book-title-header">
                    <h3 className="book-title">Book a Detail</h3>
                    <p className="book-description">We guarantee three things for all of our customers, and the rest takes care of itself. </p>
                    <ul className="book-list">
                        <li>1.{' '}Quality at the right price</li>
                        <li>2.{' '}Unrivaled convenience</li>
                        <li>3.{' '}Environmentally responsible practices</li>
                    </ul>
                </div>
                <div className="book-container-2">
                        <Link href="/services">
                        <MuiThemeProvider className="center-middie">
                            <div className="book-large">
                                <Book />
                            </div>
                            {/* <div className="book-small-one">
                                <BookSmall />
                            </div>
                            <div className="book-mobile">
                                <BookMobile />
                            </div> */}

                        </MuiThemeProvider>
                        </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookNow;