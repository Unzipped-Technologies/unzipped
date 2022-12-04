import React from 'react';
import {FileDrop} from 'react-file-drop';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import HelpIcon from '../HelpIcon';

/**
 * FileUpload Component Styling
 */
const FileUploadContainer = styled.div`
    font-family: arial;
    font-size: ${props => props.theme.baseFontSize};
    line-height: ${props => props.theme.baseLineHeight};
`;

const StyledFileDrop = styled(FileDrop)`
    width: 100%;
`;

const StyledRow = styled.div`
    margin: 0;
`;

const StyledInput = styled.input`
    display: none;
`;

const StyledIcon = styled(Icon)`
    padding-top: 5px;
    margin-right: 10px;
    height: 40px;
    width: 30px;
    min-width: 30px;
    fill: ${props => (props.$fileName ? props.theme.primary : props.theme.tint2)};
`;

const StyledIconError = styled(Icon)`
    margin-bottom: -4px;
    margin-right: 3px;
    height: 20px;
    width: 20px;
    fill: ${props => props.theme.error};
`;

const StyledTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

const StyledTitle = styled.div`
    color: ${props => (props.$titleColor ? props.theme[props.$titleColor] : props.theme.text)};
    ${props => (props.boldTitle ? `font-weight: bold` : `font-weight: normal`)}
`;

const StyledTitleHelpIcon = styled.div`
    padding-top: 6px;
    margin-left: 10px;
`;

const StyledLabel = styled.label`
    color: blue;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const SubText = styled.div`
    color: ${props => props.theme.text};
    font-size: ${props => props.theme.fontSizeXS};
    line-height: ${props => props.theme.lineHeightXS};
`;

const UploadContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
`;

const UploadBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding: 13px 18px;
    border: 2px ${props => (props.$fileName || props.$defaultFileName ? 'solid' : 'dashed')}
        ${props => props.theme.tint3};
    box-sizing: border-box;
    border-radius: 4px;
    background-color: ${props =>
        props.$isError
            ? props.theme.errorLight
            : props.$fileName || props.$defaultFileName
            ? props.theme.tint1
            : props.theme.important};
    color: ${props =>
        props.$isError
            ? props.theme.error
            : props.$fileName || props.$defaultFileName
            ? props.theme.primary
            : props.theme.tint2};
    min-height: 70px;
    @media (max-width: 421px) {
        width: auto;
    }
`;

const InputComponent = ({inputId, type, fileAddress, func, label}) =>
    type === 'button' ? (
        <>
            <StyledLabel htmlFor={inputId} role="button">
                {label}
            </StyledLabel>
            <StyledInput type={type} id={inputId} onClick={() => func(fileAddress)} />
        </>
    ) : (
        type === 'file' && (
            <>
                <StyledLabel htmlFor={inputId} role="button">
                    {label}
                </StyledLabel>
                <StyledInput type={type} data-testid={inputId} id={inputId} onChange={e => func(e)} />
            </>
        )
    );

/**
 * FileUpload Component Styling
 */
const FileUpload = ({
    boldTitle,
    defaultFileName,
    deleteDoc,
    download,
    fileAddress,
    fileName,
    handleFileChange,
    handleFileRestore,
    handleEdit = () => {},
    isDelete,
    isDownload,
    isEdit = '',
    isReplace,
    isView,
    isRestore = false,
    openDoc,
    title,
    toolTipText,
    titleColor,
    isError,
    errorMessage,
    name,
}) => (
    <FileUploadContainer>
        {title && (
            <StyledTitleContainer>
                <StyledTitle boldTitle={boldTitle} $titleColor={titleColor}>
                    {title}
                </StyledTitle>
                <StyledTitleHelpIcon>{toolTipText && <HelpIcon text={toolTipText} />}</StyledTitleHelpIcon>
            </StyledTitleContainer>
        )}
        <div>
            <StyledFileDrop onDrop={e => handleFileChange(e, 'drop')}>
                <UploadContainer>
                    <UploadBox
                        $fileName={!isError && fileName}
                        $defaultFileName={!isError && defaultFileName}
                        $isError={isError}>
                        <StyledIcon name="file" $fileName={!isError && fileName} />
                        <div>
                            {!isError && <StyledRow>{fileName || defaultFileName || 'No File Uploaded'}</StyledRow>}
                            {isError && (
                                <StyledRow>
                                    <StyledIconError name="exclaimPoint" /> {errorMessage}
                                </StyledRow>
                            )}
                            {!fileName && !defaultFileName ? (
                                <StyledRow>
                                    <SubText>
                                        Drop File Here or{' '}
                                        <InputComponent
                                            inputId={`styledInput${name}`}
                                            label="Browse"
                                            type="file"
                                            fileAddress={fileAddress}
                                            func={handleFileChange}
                                        />
                                    </SubText>
                                </StyledRow>
                            ) : (
                                <StyledRow>
                                    {!isError && (
                                        <SubText>
                                            {isView && (
                                                <InputComponent
                                                    inputId={`styledInput1${name}`}
                                                    label="View"
                                                    type="button"
                                                    fileAddress={fileAddress}
                                                    func={openDoc}
                                                />
                                            )}
                                            {isView && (isReplace || isEdit || isDelete || isDownload || isRestore) && (
                                                <> &bull; </>
                                            )}
                                            {isReplace && (
                                                <InputComponent
                                                    inputId={`styledInput2${name}`}
                                                    label="Replace"
                                                    type="file"
                                                    fileAddress={fileAddress}
                                                    func={handleFileChange}
                                                />
                                            )}
                                            {isReplace &&
                                                ((isRestore && defaultFileName !== fileName) ||
                                                    isEdit ||
                                                    isDelete ||
                                                    isDownload) && <> &bull; </>}
                                            {isRestore && defaultFileName && defaultFileName !== fileName && (
                                                <InputComponent
                                                    inputId={`styledInput4${name}`}
                                                    label="Restore to Default"
                                                    type="button"
                                                    fileAddress={fileAddress}
                                                    func={handleFileRestore}
                                                />
                                            )}
                                            {isRestore &&
                                                defaultFileName !== fileName &&
                                                (isEdit || isDelete || isDownload) && <> &bull; </>}
                                            {isEdit && (
                                                <InputComponent
                                                    inputId={`styledInput3${name}`}
                                                    label="Edit"
                                                    type="button"
                                                    fileAddress={fileAddress}
                                                    func={handleEdit}
                                                />
                                            )}
                                            {isEdit && (isDelete || isDownload) && <> &bull; </>}
                                            {isDelete && (
                                                <InputComponent
                                                    inputId={`styledInput4${name}`}
                                                    label="Delete"
                                                    type="button"
                                                    fileAddress={fileAddress}
                                                    func={deleteDoc}
                                                />
                                            )}
                                            {isDelete && isDownload && <> &bull; </>}
                                            {isDownload && (
                                                <InputComponent
                                                    inputId={`styledInput5${name}`}
                                                    label="Download"
                                                    type="button"
                                                    fileAddress={fileAddress}
                                                    func={download}
                                                />
                                            )}
                                        </SubText>
                                    )}
                                    {isError && (
                                        <SubText>
                                            Drop File Here or{' '}
                                            <InputComponent
                                                inputId={`styledInputFile${name}`}
                                                label="Browse"
                                                type="file"
                                                fileAddress={fileAddress}
                                                func={handleFileChange}
                                            />
                                        </SubText>
                                    )}
                                </StyledRow>
                            )}
                        </div>
                    </UploadBox>
                </UploadContainer>
            </StyledFileDrop>
        </div>
    </FileUploadContainer>
);

FileUpload.propTypes = {
    /** Bool to make title bold */
    boldTitle: PropTypes.bool,
    /** Function used to delete document */
    deleteDoc: PropTypes.func,
    /** Function used to download document */
    download: PropTypes.func,
    /** URL of the file, which is used to view file */
    fileAddress: PropTypes.string,
    /** Name of the file being uploaded */
    fileName: PropTypes.string,
    /** Function used to upload the file and to replace the file */
    handleFileChange: PropTypes.func,
    /** Function used to restore the file to default */
    handleFileRestore: PropTypes.func,
    /** Boolean to show Delete button */
    isDelete: PropTypes.bool,
    /** Boolean to show Download button */
    isDownload: PropTypes.bool,
    /** Boolean to show Replace button */
    isReplace: PropTypes.bool,
    /** Boolean to show View button */
    isView: PropTypes.bool,
    /** Boolean to show Restore Button */
    isRestore: PropTypes.bool,
    /** Function used to open the file */
    openDoc: PropTypes.func,
    /** Text used for the title */
    title: PropTypes.string,
    /** Text inside ToolTip */
    toolTipText: PropTypes.string,
    /** Custom color for the title */
    titleColor: PropTypes.string,
    /** Boolean to show error message */
    isError: PropTypes.bool,
    /** Text displayed while in error */
    errorMessage: PropTypes.string,
    /** Text used to uniquely id component */
    name: PropTypes.string,
    /** Boolean to show Edit button*/
    isEdit: PropTypes.bool,
    /** Function that handles Edit button onClick */
    handleEdit: PropTypes.func,
};

FileUpload.defaultProps = {
    boldTitle: false,
    deleteDoc: () => {},
    download: () => {},
    fileAddress: 'default',
    handleFileChange: () => {},
    isDelete: false,
    isDownload: false,
    isReplace: false,
    isView: false,
    openDoc: fileAddress => {
        return fileAddress;
    },
    title: '',
    titleColor: '',
    isError: false,
    errorMessage: '',
    name: '',
};

export default FileUpload;
