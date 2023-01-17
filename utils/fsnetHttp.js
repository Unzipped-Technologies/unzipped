class FSNetHTTP {

    toFormData() {
        return;
    }

    getDocTempFile(file) {
        console.log('file file file', file)
        return {
            data: {
                url: urlStart + file.name
            }
        }
    }

}

export default new FSNetHTTP();