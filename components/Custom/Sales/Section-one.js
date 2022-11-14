import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Button } from 'reactstrap';
import Icon from "@material-ui/core/Icon";
import Link from 'next/link';
import {connect, useDispatch} from 'react-redux';
import { addCart, loadProducts } from '../../../redux/actions';

const SectionOne = ({data, title, btype, getServices}) => {
    const dispatch = useDispatch()
    const [addCartBTN, setAddCartBTN] = useState(false);

    const AddProduct = (name, price, id) => {
        dispatch(addCart(name, price, id))
    }

    useEffect(() => {
        if (getServices.length < 1) {
            dispatch(loadProducts());
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            </Head>
            {/* Section One */}
            <div className="car-wash-sec-one">
                <h3 className="section-wash-title">{title}</h3>
                <div className="photo-wash-container" >
                    {data.map((item, index) => {
                        return (
                            <div 
                                key={index} 
                                className="wash-sec-container"
                                onMouseEnter={() => setAddCartBTN(index)}
                                onMouseLeave={() => setAddCartBTN(false)}
                                >
                            {index !== 1 && 
                                <div className="two-img-containers">
                                <img src={"https://img.icons8.com/nolan/64/add.png"} alt="" className={index === 1 ? "addToCart-float-1" : "addToCart-float"} onClick={() => AddProduct(item.title, item.price, item.id)}/>
                                <img src={`/img/${item.image}`} alt="" className="wash-image" />
                                </div>
                            }
                            {index === 1 && 
                                <div className="two-img-containers-mobile">
                                <img src="https://img.icons8.com/nolan/64/add.png" alt="" className={index === 1 ? "addToCart-float-1" : "addToCart-float"} onClick={() => AddProduct(item.title, item.price, item.id)}/>
                                <img src={`/img/${item.image}`} alt="" className="wash-image" id="after-image-mobile"/>
                                </div>
                            }
                            <div className={index ===1 ? "content-wash" : "content-wash-one"}>
                                
                                {btype === 'bullet' &&
                                <>
                                <h5 className="wash-h4">{item.title}</h5>
                                <ul className={"bullet-container-wash"}>
                                    {item.content.map((bullet, index) => {
                                        return (
                                            <div key={index}>
                                            <li id='bullet-wash'>
                                                {bullet}
                                            </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                                </>
                                }
                                {btype !== 'bullet' &&
                                <>
                                <h5 className="wash-h5">{item.title}</h5>
                                <div className="paragraph-container-wash">
                                    {item.content}
                                </div>    
                                </>
                                }
                            </div>
                            {index === 1 && 
                            <div className="two-img-containers">
                            <img src="https://img.icons8.com/nolan/64/add.png" alt="" className={index === 1 ? "addToCart-float-1" : "addToCart-float"} id="also-afterimage" onClick={() => AddProduct(item.title, item.price, item.id)}/>
                            <img src={`/img/${item.image}`} style={{position: 'relative'}} alt="" className="wash-image" id="after-image"/>
                            </div>
                            }
                        </div>
                        )
                    })}
                </div>
                <div className="button-container-s">
                    <Link href="/services">
                        <Button className="learn-more-button" id="button-mover">
                            Book Now
                        </Button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state.Booking)
    return {
        getServices: state.Booking.existingItems,
    }
}

export default connect(mapStateToProps, { addCart, loadProducts })(SectionOne);