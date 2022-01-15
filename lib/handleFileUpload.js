const getFileFakePath = (file) => {
    const fileData = file.target.files[0];        
    const fileFakePath = file.target.value;
    return {fileData, fileFakePath};
} 

const getExtension = (fileFakePath) => fileFakePath.substring(fileFakePath.lastIndexOf('.')+1);

module.exports = {getExtension, getFileFakePath}