import React from 'react';
import {Icon} from '..';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const styles = `
  font-family: Arial;
    font-size: ${props => props.theme.fontSizeS};
    font-style: normal;
    font-weight: 400;
    line-height: ${props => props.theme.lineHeightS};
    letter-spacing: 0px;
    text-align: left;
`;

const styles2 = `
    font-family: Arial;
    font-size: ${props => props.theme.fontSizeS};
    font-style: normal;
    font-weight: 700;
    line-height: ${props => props.theme.lineHeightS};
    letter-spacing: 0px;
    text-align: left;
    white-space: no-wrap;
    `;

const UploadComponentContainer = styled.div`
    display: flex;
    padding-top: 30px;
    margin: ${props => props.margin};
`;

const UploadSecondaryText = styled.span`
    display: flex;
    align-items: center;
    color: ${props => props.theme.secondary};
    ${styles2};
    cursor: pointer;
`;

const WarningText = styled.p`
    color: ${props => props.theme.textSecondary};
    ${styles};
`;

const WarningTextRed = styled.p`
    color: ${props => props.theme.error};
    margin-left: 5px;
    margin-top: 3px;
    ${styles};
`;

const FirstSubUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SecondSubUploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UploadImageTitle = styled.p`
    color: ${props => props.theme.textSecondary};
    padding-bottom: 8px;
    ${styles}
`;

const UploadedImage = styled.img`
    width: 80px;
    height: 80px;
`;

const StyledSpan = styled.span`
    color: ${props => props.theme.secondary};
    padding: 0px 3px;
    font-size: 1.7rem;
`;
const StyledTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const StyledInput = styled.input`
    display: none;
`;

const StyledLabel = styled.label`
    color: ${props => props.theme.secondary};
    ${styles2};
    cursor: pointer;
`;

const StyledFlexContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledDefaultImage = styled(Icon)`
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
`;

const UploadInput = ({type, inputId, label, uploadFile}) => {
    return (
        <>
            <StyledLabel htmlFor={inputId} role="button">
                {label}
            </StyledLabel>
            <StyledInput type={type} data-testid={inputId} id={inputId} onChange={e => uploadFile(e)} />
        </>
    );
};

const UploadImageProfile = ({
    photoToLoad,
    iconToLoad,
    heading,
    removeImage,
    nextTextImage,
    imgWidth,
    imgHeight,
    imageName,
    showError,
    handleOnChange,
    defaultIcon,
    margin,
    subTitle,
}) => {
    return (
        <UploadComponentContainer margin={margin}>
            <FirstSubUploadContainer>
                <UploadImageTitle>{heading}</UploadImageTitle>

                <SecondSubUploadContainer>
                    {photoToLoad ? (
                        <UploadedImage src={photoToLoad} />
                    ) : iconToLoad ? (
                        iconToLoad
                    ) : (
                        <StyledDefaultImage name={defaultIcon} />
                    )}
                    <StyledTitleContainer>
                        <StyledFlexContainer>
                            <UploadInput
                                type="file"
                                inputId="uploadBtn"
                                label={'Upload new image'}
                                uploadFile={handleOnChange}
                            />
                            {photoToLoad && (
                                <>
                                    <StyledSpan>&#8226;</StyledSpan>{' '}
                                    <UploadSecondaryText onClick={removeImage}>{nextTextImage}</UploadSecondaryText>
                                </>
                            )}
                        </StyledFlexContainer>
                        {showError ? (
                            <StyledFlexContainer>
                                <Icon name="exclaimPoint" />{' '}
                                <WarningTextRed>{'Please upload a valid image'}</WarningTextRed>
                            </StyledFlexContainer>
                        ) : (
                            <WarningText>
                                {imageName
                                    ? `${subTitle ? 'Fund Image' : 'Title'}: ${imageName}`
                                    : `${
                                          subTitle ? 'Fund Image' : 'Title'
                                      }: (Image must not exceed ${imgWidth}x${imgHeight})`}
                            </WarningText>
                        )}
                    </StyledTitleContainer>
                </SecondSubUploadContainer>
            </FirstSubUploadContainer>
        </UploadComponentContainer>
    );
};

UploadImageProfile.propTypes = {
    /** Heading of Component */
    heading: PropTypes.string,
    /** Function To Remove Pic, if Pic is Uploaded */
    removeImage: PropTypes.func,
    /** Saying to Click if Pic is already Uploaded */
    nextTextImage: PropTypes.string,
    /** Set First Number of Picture Dimension */
    imgWidth: PropTypes.number,
    /** Set Second Number of Picture Dimension */
    imgHeight: PropTypes.number,
    /** Icon to load if there an icon needed */
    iconToLoad: PropTypes.node,
    /** Image that is going to be loaded */
    photoToLoad: PropTypes.node,
    /** Error Message to be show if file doesn't meet requirements */
    showError: PropTypes.bool,
    /** Function to change icon/photo */
    handleFileChange: PropTypes.func,
    /** Image name */
    imageName: PropTypes.any,
    /** Default icon */
    defaultIcon: PropTypes.string,
    /** Set margin */
    margin: PropTypes.string,
    /** Sets Subtitle of image width and height */
    subTitle: PropTypes.bool,
};

UploadImageProfile.defaultProps = {
    heading: 'Upload Image',
    removeImage: () => {},
    handleFileChange: () => {},
    nextTextImage: 'Remove image',
    imgWidth: 512,
    imgHeight: 512,
    showError: false,
    imageName: '',
    defaultIcon: 'profilePic',
    margin: '',
    subTitle: false,
};

export default UploadImageProfile;
