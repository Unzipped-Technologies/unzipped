import React from 'react';
import Link from 'next/link';

const BlogHeader = ({ data }) => {

    return (
        <React.Fragment>
            {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link> */}
            <div className="blog-img-section">
                {data.map((item, index) => {
                    return (
                        <div className="box-one-blog" key={index}>
                            <div className="blog-crop">
                                <img src={`/img/${item.image}`} alt="" className="blog-img-one"/>
                            </div>
                            <h3 className="step-one-title blog-header-title" >
                                {item.title}
                            </h3>
                            <div className="blog-box-one blog-header" id="paragraph-left">
                                {item.text}
                            </div>   
                            <Link href={`/blog/${item.link}`}>
                            <p className="blog-box-one blog-button" id="paragraph-left" >
                                Read More
                            </p>   
                            </Link>                    
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default BlogHeader;