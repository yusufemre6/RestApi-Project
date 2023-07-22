const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileFilter=(req,file,cb)=>{
    const allowedMimeTypes =["image/png","image/jpg","image/jpeg"];
    
    if(!allowedMimeTypes.includes(file.mimetype)){
        cb(new Error("Bu resim tipi desteklenmemektedir",false));
    }
    cb(null,true);
};

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const rootDir= "/Users/yusufemre/Desktop/rest-api-project";
        cb(null,path.join(rootDir,"/public/uploads"))
    },
    filename:function(req,file,cb){
        const extension= file.mimetype.split('/')[1];

        if(!req.savedImages) req.savedImages=[];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        let url = `image_${uniqueSuffix}.${extension}`;

        req.savedImages=[...req.savedImages,path.join(url)];

        req.newFileAddress = path.join("/public/uploads", url);

        cb(null,url);
    }
})

const upload=multer({storage,fileFilter}).single("images");

module.exports= upload;