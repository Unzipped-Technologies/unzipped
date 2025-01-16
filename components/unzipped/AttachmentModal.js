import React, { useState, useRef, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import styled from 'styled-components';
import UploadArrow from '../../components/icons/uploadArrow';
import Dropzone from 'react-dropzone';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 460px) {
    margin-top: 0px;
  }
`;

const ImageWrapper = styled.div`
  width: 95%;
  border-radius: 10px;
  background: #D9D9D9;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${({ isMaxFileLimit }) => (isMaxFileLimit ? '1' : '1')};

  @media (max-width: 460px) {
    width: 90%;
    margin-top: 60px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const ImageTextStyled = styled.p`
  color: #444;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
`;

const ContentContainer = styled.div`
  padding: 10px 20px;
  width: 90%;
  font-family: 'Roboto';
  line-height: 25px;
  font-size: 16px;
`;

const ContainedSpan = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 15px;
  background-color: #d9d9d9;
  padding: 2px 10px;
  margin: 5px;
  font-size: 14px;
`;

const AttachmentModal = ({ setFileUploadModal, userId, onUpload, setAttachmentsInfo, attachmentsInfo }) => {
    const dropzoneRef = useRef(null);
    const [isMaxFileLimit, setIsMaxFileLimit] = useState(false);

    const openDropzone = () => {
        if (dropzoneRef.current && !isMaxFileLimit) {
            dropzoneRef.current.open();
        }
    };
    const handleDrop = (acceptedFiles) => {

        var reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = function () {
            setAttachmentsInfo(prevAttachments => [...prevAttachments, {
                file: reader.result,
                name: acceptedFiles[0].name.split('.')[0],
                type: acceptedFiles[0].type
            }])
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };F
    };

    const handleFileAttachmentModal = () => {
        setFileUploadModal(false);
    };

    const handleDeleteFile = (index) => {
        setAttachmentsInfo((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
    };

    return (
        <Modal onHide={() => setFileUploadModal(false)}>
            <ImageWrapper onClick={openDropzone} >
                <ImageContainer>
                    <UploadArrow />
                    <ImageTextStyled>Upload Files (.png, .jpg, .txt, .pdf, .csv)</ImageTextStyled>
                    <Dropzone ref={dropzoneRef} onDrop={handleDrop} noClick multiple>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </Dropzone>
                </ImageContainer>
            </ImageWrapper>

            <Left>
                <ContentContainer>
                    {attachmentsInfo.map((file, index) => (
                        <ContainedSpan key={file.name + '_' + index}>
                            <ClearSharpIcon
                                data-testid={`${file.name}_icon`}
                                style={{ fontSize: '12px', color: 'white', background: '#333', borderRadius: '50%', marginRight: '5px', cursor: 'pointer' }}
                                onClick={() => handleDeleteFile(index)}
                            />
                            {file.name}
                        </ContainedSpan>
                    ))}
                </ContentContainer>
            </Left>

            <Right>
                <Button noBorder onClick={handleFileAttachmentModal}>Attach</Button>
            </Right>
        </Modal>
    );
};

export default AttachmentModal;