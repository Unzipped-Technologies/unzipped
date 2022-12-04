import React from 'react';
import Link from 'next/link';
import { Button } from 'reactstrap';

const SectionFive = () => {
    return (
        <React.Fragment>
            <div className="section-five-container">
                <div className="container-sec-five">
                    <h1 className="slogan-sec-five">
                        <span className="title-span">
                            The Unzipped Experience
                        </span>
                        <br />
                        <span className="title-span">
                        Connect.Build.<span className="enjoy">grow </span>.
                        </span>
                    </h1>
                    <p >
                        Book today and get your first interior and exterior detail for only $50. 
                    </p>
                    <div className="button-container" id="learn-button">
                        <Link href="/services">
                        <button className="learn-more-button" id="learn-button">
                            Book Now
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SectionFive;