import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/vimeo';

const ReactVideo = ({url}) => {
    const videoRef = useRef(false);
    const [controls, setControls] = useState(true);
    
    return (
        <React.Fragment>
            <div 
                className="video-container"
            >
                <ReactPlayer 
                    ref={videoRef} 
                    url={url} 
                    className='react-player'
                    pip = {false}
                    playing={false}
                    controls={controls}
                    light={false}
                    loop={false}
                    playbackRate={1}
                    volume={0.8}
                    muted={false}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                />
            </div>
        </React.Fragment>
    )
}

export default ReactVideo;