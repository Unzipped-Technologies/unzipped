import React from 'react';
import ReactVideo from '../React-video';
import {
    SkillPodLogo
} from '../../icons'


// import "../../../../node_modules/video-react/dist/video-react.css"; // import css

const SectionFour = () => {
    return (
        <React.Fragment>
            <div className="section-four-container">
                <ReactVideo url={'https://vimeo.com/770593292'} />
                <div className="content-below-four">
                    <h3 className="content-four-title">
                        WHAT ARE  {<SkillPodLogo />}SKILLPODS?
                    </h3>
                    <p className="text-four">
                    <SkillPodLogo size={18}/>SKILLPODS are diverse. agile, skilled "Dev Units" or "IT teams" tailored to deliver the value and features you want. They're robust, smart teams that can thrive in any environment and handle any job or problem thrown at them.
                    <br />
                    <br />
                    Seasoned software engineers that can take a straight line to the solution you need aren't easy to find. But we found them.  
                    <br />
                    <br />
                    The best UX designers that will design your website to look amazing. Moreover, your site will be user-friendly, intuitive, and lightning-fast.  
                    <br />
                    <br />
                    Top-tier project managers that drive your project from conception to completion, with any necessary hand-holding along the way.
                    <br />
                    <br />
                    Bottom line, we hire SKILL. 
                    </p>
                </div>
                {/* </div> */}
            </div>
        </React.Fragment>
    )
}

export default SectionFour;