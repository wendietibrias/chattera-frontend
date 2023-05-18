const MIMEType = ['image/jpg', 'image/jpeg' , 'image/png' , 'image/gif'];

const mimeTypeChecker = (file) => {
     if(file && !MIMEType.includes(file.type)) {
         return false;
     }


     return true;
}

export default mimeTypeChecker;