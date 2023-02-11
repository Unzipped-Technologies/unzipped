const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const pathJoin = (dir, filePath) => {
    return path.join(dir, filePath)
}

const pathResolve = (dir, dirPath = null, filePath = null) => {
    return dirPath && filePath ?
        path.resolve(dir, dirPath, filePath) : dirPath ?
            path.resolve(dir, dirPath) : path.resolve(dir)
}

const pathBasename = (dir) => {
    return path.basename(dir)
}

const pathExtname = (dir) => {
    return path.extname(dir)
}

const pathDirname = (dir) => {
    return path.dirname(dir)
}

const readFile = (path, encoding = null) => {
    return encoding ? fs.readFileSync(path, encoding) : fs.readFileSync(path)
}

const existsFile = (url) => {
    return fs.existsSync(url)
}

const copyFile = (src, dest) => {
    return fs.copyFileSync(src, dest)
}

const writeFile = (fileName, template, encoding) => {
    return fs.writeFileSync(fileName, template, encoding)
}

const statFile = (path) => {
    return fs.statSync(path)
}

const mkDir = (path, setting) => {
    return fs.mkdirSync(path, setting)
}

const validateExtension = (validExtensions, path) => {
  return validExtensions.includes(pathExtname(path).toLowerCase())
}

module.exports = {
    readFile,
    existsFile,
    copyFile,
    writeFile,
    statFile,
    pathJoin,
    pathResolve,
    pathDirname,
    pathExtname,
    pathBasename,
    mkDir,
    validateExtension
}
