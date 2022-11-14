import React, {useEffect, useRef} from 'react';
import Head from 'next/head';
import Icon from "@material-ui/core/Icon";

const FAQCard = ({data, focus, setFocus}) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFocus(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <React.Fragment >
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div>
            <div className={"card-container-faq"} onClick={() => focus !== data.title ? setFocus(data.title) : setFocus(false)}>
                <h6 id="faq-title-size">{data.title}</h6>
                <Icon className="material-icons">add</Icon>
            </div>
            <div className="faq-dropbox">
                {focus === data.title &&
                <div className="answer-drop" >
                    <p>{data.content}</p>
                </div>
                }
            </div>
            </div>
        </React.Fragment>
    )
}

export default FAQCard;