import styled from "styled-components";
import UploadArrow from "../../icons/uploadArrow";
import Dropzone, { useDropzone } from 'react-dropzone'
import React, { useState, useRef, useEffect } from "react";

const ImageWrapper = styled.div`
    // display: ${({ display }) => display ? display : 'flex'};
    // flex-direction: ${({ flexDirection }) => flexDirection ? flexDirection : 'row'};
    // justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'center'};
    // align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
    width: ${({ width }) => width ? width : '100%'};
    border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : '10px'};
    background: ${({ background }) => background ? background : '#fff'};
    padding: ${({ padding }) => padding ? padding : '10px'};
    text-align: center;
`;

const ImageContainer = styled.div`
    // display: ${({ display }) => display ? display : 'flex'};
    width: ${({ width }) => width ? width : '100%'};
    height: ${({ height }) => height ? height : '100%'};
    padding-top: 40px;
`;

const ImageTextStyled = styled.p`
    color: #444;
    font-family: Roboto;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 15px;
`;

const UploadImage = ({ setFiles, files }) => {

    const dropzoneRef = useRef(null)
    const [isDropzoneVisible, setIsDropzoneVisible] = useState(false);
    const [isMaxFileLimit, setIsMaxFileLimit] = useState(false);

    const openDropzone = () => {
        if (dropzoneRef.current && files.length < 3) {
            dropzoneRef.current.open()
        }
    }

    const closeDropzone = () => {
        setIsDropzoneVisible(false)
    }

    const handleDrop = acceptedFiles => {

        if (files.length <= 3) {
            setFiles([...files, ...acceptedFiles]);
        }
        closeDropzone();

    }
    console.log('files_array', files)

    useEffect(() => {
        if (files.length >= 3) {
            console.log('setMaxLimit')
            setIsMaxFileLimit(true);
        } else {
            setIsMaxFileLimit(false);
        }
    }, [files])

    return (
        <>
            <ImageWrapper
                display="flex"
                width="100%"
                borderRadius="10px"
                background="#D9D9D9"
                padding="10px"
                flexDirection="column"
                alignItems="center"
                onClick={isMaxFileLimit ? null : openDropzone}
                style={{
                    opacity: isMaxFileLimit ? "0.2" : "1",
                    cursor: isMaxFileLimit ? "not-allowed" : "default",
                }}
            >
                <ImageContainer >
                    <UploadArrow />
                    <ImageTextStyled >
                        Upload Image (.png, .jpg, .gif)
                    </ImageTextStyled>
                    <Dropzone ref={dropzoneRef} onDrop={handleDrop} noClick={true} multiple={true}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </Dropzone>
                </ImageContainer>
            </ImageWrapper>
        </>
    )
}

export default UploadImage;