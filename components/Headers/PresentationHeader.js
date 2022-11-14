import React from 'react';
// import CarPic2 from '../../assets/img/stock-car-5.jpg';
// import CarPic2 from '../../assets/img/vohnt-header-2.png';


const PresentationHeader = ({banner, image, imageTwo, imageThree}) => {
    return (
        <React.Fragment>
            <div className="background-div-head">
                <img src={`/img/${image}`} alt="" className="header-pic" />
                <img src={`/img/${imageTwo}`} alt="" className="header-pic-mobile" />
                <img src={`/img/${imageThree}`} alt="" className="header-pic-mobile-2" />
                <h3 className="vohnt-slogan">{banner}</h3>
                <div className="text-container-c" id="text-container-w">
                    <p className="below-header">Creating a world where you have immediate, convenient, and reliable access to app development.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PresentationHeader;