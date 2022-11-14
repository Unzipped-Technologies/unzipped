import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Button,
  } from "reactstrap";

const Carousels = () => {
    const [focus, setFocus] = useState(false);
    const [reviews, setReviews] = useState([]);

    const items = [
        {
            image: "/img/jaclyn.png",
            description: `"Our firm has been working with Unzipped for 10+ years and they have been a great partner!!!  Their response time and availability are great!  Our profession requires a lot of after-hours work "`,
            name: 'Jaclyn Convertini',
        },
        {
            image: "/img/jacob.png",
            description: `"Unzipped Technologies was an excellent Software Development partner. The final mobile app was tested and all its functionalities performed very well. Their work methodology was top-notch and  "`,
            name: 'Jacob Palmer',
        },
        {
            image: "/img/kolton.png",
            description: `"thank you Unzipped tech. for this amazing experience. I made a mobile application for my small business employees and management are so flexible to work with. I really appreciate your business. "`,
            name: 'Kolton Rice',
        },
      ]

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

      useEffect(() => {
        let reviewList = shuffle(items)
        setReviews(reviewList.slice(0,4));
      }, [])


    return (
        <div
            onMouseEnter={() => setFocus('button')}
            // onMouseLeave={() => setFocus(false)}
        >
        <Carousel 
            className="carousel-C"
            NavButton={({onClick, className, style, next, prev}) => {
                // Other logic
        
                return (
                    <>
                    {focus === 'button' &&
                        <button onClick={onClick} className="Carousel-button" style={style} aria-label="navigate">
                            {next && <span className="fa fa-angle-right" id="fix-b-right"/>}
                            {prev && <span className="fa fa-angle-left" id="fix-b-left" />}
                        </button>
                    }
                    </>
                )
            }}
        >
            {
                reviews.map( (item, i) => {
                    return (
                        <div key={i}>
                        {i < 4 &&
                            <Item key={i} item={item} /> 
                        }
                        </div>
                    )

            })
            }
        </Carousel>
        </div>
    )
}

function Item({item})
{
    return (
        <div className="card-container-C">
        <div className="card-item-c">
        <div className=" card-avatar">
        <div className="img-container-1">
          <img
            alt="..."
            className=" img-icon"
            src={item.image}
          ></img>
        </div>
        </div>
        <div>
          <h5 className="card-description">
          {item.description.substring(0,280)}
          </h5>
          <div className={item.description < 260 ? "name-C-footer" : "name-C-footer-1"}>
            <div tag="h4">{item.name}</div>
            {/* <h6 className=" card-category">Web Developer</h6> */}
            <div className=" card-stars">
              <i aria-hidden={true} className=" fa fa-star mr-1"></i>
              <i aria-hidden={true} className=" fa fa-star mr-1"></i>
              <i aria-hidden={true} className=" fa fa-star mr-1"></i>
              <i aria-hidden={true} className=" fa fa-star mr-1"></i>
              <i aria-hidden={true} className=" fa fa-star"></i>
            </div>
          </div>
        </div>
        </div>
        </div>
    )
}

export default Carousels;