import React, { useState } from 'react';
import Image from 'next/image'
import IconHolder from '../IconHolder'
// import Image1 from '../../../assets/img/Section-one-image-one.png';

const SectionElement = ({title, content, link}) => {
    const [focus, setFocus] = useState(false);
    // console.log(image)
    console.log(content)
    return (
        <React.Fragment>
            <div className="section-one-inner-container">
                {title && (
                    <a href={link} className="section-one-title">
                        {title}
                    </a>
                )}
                <div className="section-one-image">
                    {content.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div key={index} className="img-container-buy">
                                    <IconHolder key={item.name + index} index={index} item={item.number - 1} name={item.name} />
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SectionElement;