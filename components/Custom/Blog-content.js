import React from 'react';

const BlogContent = ({data, prelink, nextlink, prev, next}) => {
    return (
        <React.Fragment>
            <div className="blog-content-container">
            {data.map((item, index) => {

                const textd = item.content.split('\n')
                const text = item.content.split('\n').map((n) => {
                    if (n === '') {
                        if( item.content !== 'bullet') {
                            return <br />
                        }
                    }
                    return <p>{n}</p>
                });
            

                return (
                    <div key={index}>
                    {item.type === 'title' &&
                        <h1 id="blog-title-1">{text}</h1>
                    }
                    {item.type === 'title-center' &&
                        <h1 className="title-center-one">{text}</h1>
                    }
                    {item.type === 'paragraph' &&
                        <p className="faqs-text">{text}</p>
                    }
                    {item.type === 'bullet' && 
                        <ul>
                            <li className="faqs-text" id="bullet-blog">{text}</li>
                        </ul>
                    }
                    {item.type === 'title-2' && 
                        <h5 className="title-two-B">{text}</h5>
                    }
                    {item.type === 'numbered' &&
                        <div className="numbered-B">{text}</div>
                    }
                </div>
                )
            })}
            <div className="blog-nav">
            
            <div className={prev !== 'first' ? "blog-footer" : "blog-footer-t"}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
                <a href={prelink}><span className="blog-text">{prev}</span></a>
            </span>
            </div>
            
             
            <div className={next !== 'last' ? "blog-footer-right" : "blog-footer-right-t"}>
            <span>
                <a href={nextlink}><span className="blog-text-right">{next}</span></a>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
            </div>
            
            </div>
            </div>
        </React.Fragment>
    )
}

export default BlogContent;