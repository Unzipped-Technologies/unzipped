import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'reactstrap';

const PresentationTwo = ({data, content}) => {
    return (
        <React.Fragment>
            <div className="sec-two-img-section">
                {data.map((item, index) => {
                    return (
                        <div className="box-one-section" key={index}>
                            <div >
                                <img src={`/img/${item.image}`} alt="" className="sec-two-img"/>
                            </div>
                            <h4 className="step-one">
                                {item.title}
                            </h4>
                            <div className="paragraph-box-one">
                                {item.text}
                            </div>                            
                        </div>
                    )
                })}
            </div>
            <div className="button-container">
                    <Link href='/how-it-works'>
                    <button className="learn-more-button" id="button-two">
                        {content}
                    </button>
                    </Link>
            </div>
        </React.Fragment>
    )
}

export default PresentationTwo;