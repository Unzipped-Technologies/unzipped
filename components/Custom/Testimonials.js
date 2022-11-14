import React, { useEffect, useState } from "react";
import Image from 'next/image';
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import Carousels from './Test';
import ScrollAnimation from 'react-animate-on-scroll';

// core components


const SectionTestimonials = () => {
    const [one, setOne] = useState(false);

  return (
    <>
      {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link> */}
      <div className="section section-testimonials">
        <Container fluid className="center-content-c">
          <Row className="top-row-C">
            <Col className="ml-auto mr-auto text-center" md="8">
              <h3 className="title-center">See what our customers have to say about Unzipped</h3>
              <h5 className="description-center">
              
              </h5>
            </Col>
          </Row>
          <Row className="row-two-c">
            <Col className="ml-auto sort-c" md="2">
              <div className="testimonials-people">
              <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="left-first-person add-animation"
                  src={
                    '/img/testimonial_1.jpg'
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="left-second-person add-animation"
                  src={
                    '/img/testimonial_2.jpg'
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="left-third-person add-animation"
                  src={
                    "/img/testimonial_3.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="left-fourth-person add-animation"
                  src={
                    "/img/testimonial_4.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="left-fifth-person add-animation"
                  src={
                    "/img/testimonial_5.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="left-sixth-person add-animation"
                  src={
                    "/img/testimonial_6.jpg"
                  }
                />
                </ScrollAnimation>
              </div>
            </Col>
            <Col md="6">
              <div className="page-carousel">
                <Carousels />
              </div>
            </Col>
            <Col className="mr-auto sort-c" md="2">
              <div className="testimonials-people">
              <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="right-first-person add-animation"
                  src={
                    "/img/testimonial_7.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="right-second-person add-animation"
                  src={
                    "/img/testimonial_8.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="right-third-person add-animation"
                  src={
                    "/img/testimonial_9.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="right-fourth-person add-animation"
                  src={
                    "/img/testimonial_10.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="right-fifth-person add-animation"
                  src={
                    "/img/testimonial_11.jpg"
                  }
                />
                </ScrollAnimation>
                <ScrollAnimation animateIn='animate__bounceInUp' animateOut="animate__bounceOutDown">
                <img
                  alt="..."
                  className="right-sixth-person add-animation"
                  src={
                    "/img/testimonial_12.jpg"
                  }
                />
                </ScrollAnimation>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SectionTestimonials;
