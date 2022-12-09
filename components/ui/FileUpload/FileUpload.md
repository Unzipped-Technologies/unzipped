```js
<FileUpload fileAddress="https:google.com" title="Upload W8 Form" toolTipText="Form is used for..." />
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
<FileUpload
    fileAddress="https:google.com"
    title="Bold Custom Colored Title."
    toolTipText="Form is used for..."
    boldTitle
    titleColor="primary"
/>
<FileUpload
    fileAddress="https:google.com"
    title="FileUpload Component With Error."
    boldTitle
    titleColor="primary"
    isError
    errorMessage="Invalid File Type"
/>
<FileUpload
    fileAddress="https:google.com"
    defaultFileName="DefaultFile.pdf"
    isView
    isReplace
    isDelete
    isDownload
    isEdit
    title="FileUpload Component with Default File"
    toolTipText="Form is used for..."
    openDoc={() => console.log('FileUpload: openDoc')}
/>
<FileUpload
    fileAddress="https:google.com"
    defaultFileName="DefaultFile.pdf"
    fileName="File.pdf"
    isView
    isReplace
    isDelete
    isDownload
    isEdit
    title="FileUpload Component with Default File and File Uploaded"
    toolTipText="Form is used for..."
    openDoc={() => console.log('FileUpload: openDoc')}
/>
<FileUpload
    fileAddress="https:google.com"
    defaultFileName="DefaultFile.pdf"
    fileName="File.pdf"
    isView
    isDownload
    isEdit
    isRestore
    title="FileUpload Component with Default File and File Uploaded - restore to default shown"
    toolTipText="Form is used for..."
    handleFileRestore={() => console.log('restore file')}
    openDoc={() => console.log('FileUpload: openDoc')}
/>
```
