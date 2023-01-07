import React from 'react'
import Modal from '../ui/Modal'
import FileUpload from '../ui/FileUpload'

const AttachmentModal = ({setFileUploadModal}) => {
    return (
        <Modal onHide={() => setFileUploadModal(false)}>
            <FileUpload
                fileAddress="https:google.com"
                fileName="File.pdf"
                isView
                isReplace
                isDelete
                isDownload
                isEdit
                title="File.pdf Uploaded."
                toolTipText="Form is used for..."
                openDoc={() => console.log('FileUpload: openDoc')}
            />
        </Modal>
    )
}

export default AttachmentModal