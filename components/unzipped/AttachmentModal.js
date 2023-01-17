import React, {useState} from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import FileUpload from '../ui/FileUpload'
import styled from 'styled-components'
import { BrowserUtils, ConverterUtils, FSNetHTTP, appInsights } from '../../utils'

const Right = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const AttachmentModal = ({
    //functions
    setFileUploadModal, 
    createTempFile
}) => {
    const [messageFile, setMessageFile] = useState({})
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        return submitTemporaryFile(e.target.files[0])
    }
    const submitTemporaryFile = async (file) => {
        console.log('/////', file)
        try {
            const tempDoc = await FSNetHTTP.getDocTempFile(file)
            setMessageFile({name: file?.name, address: tempDoc?.data?.url})
        } catch (err) {
            appInsights.trackException({exception: err})
        }
    }
    console.log('messageFile', messageFile)
    const openDoc = url => {
        BrowserUtils._openDoc(url)
    }
    const deleteUploadedFile = () => {
        setMessageFile({})
    }
    const downloadFile = () => {
        setMessageFile({})
    }
    // TODO: note maximum size allowed for file is 10485760
    return (
        <Modal onHide={() => setFileUploadModal(false)}>
            <FileUpload
                fileAddress={messageFile?.address}
                fileName={messageFile?.name}
                handleFileChange={e => handleFileChange(e)}
                isReplace={messageFile?.name}
                isDelete={messageFile?.name}
                isView={messageFile?.address}
                isDownload={messageFile?.name}
                title={`Upload attachment ${messageFile.name || 'file'}.`}
                toolTipText="Form is used for..."
                download={downloadFile}
                openDoc={() => openDoc(messageFile?.address)}
                deleteDoc={deleteUploadedFile}
            />
            <Right><Button noBorder>Attach</Button></Right>
        </Modal>
    )
}

export default AttachmentModal