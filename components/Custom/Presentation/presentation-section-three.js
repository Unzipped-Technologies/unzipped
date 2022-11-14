import React from 'react';
import SectionTwo from './presentation-section-two';

const SectionThree = () => {

    const data = [
        {
            title: "Quality at the Right Price",
            content: "Quality that you don’t get overcharged for. Don’t pay for other companies' inefficiencies. ",
        },
        {
            title: "Redefined Convenience",
            content: "Done on your car’s time, not yours. Why not have your car made like new when you’re not using it?  ",
        },
        {
            title: "Environmentally Responsible",
            content: "Convenience shouldn’t come at a high cost to you or the environment. We don’t sacrifice our future for more profit.",
        },
    ]

    return (
        <React.Fragment>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>

            <div className="section-three-container">
                <h2 className="three-title-sec">
                    Why Vohnt?
                </h2>
                <div className="three-box-content">
                    {data.map((item, index) => {
                        return (
                            <div className="content-three-container" key={index}>
                                <h5 className="content-three-title">
                                    {item.title}
                                </h5>
                                <p className="content-three-content">
                                    {item.content}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SectionThree;