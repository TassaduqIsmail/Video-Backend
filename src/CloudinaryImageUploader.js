
const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
    cloud_name: 'ds8wtc0yi', 
    api_key: '344266855257532', 
    api_secret: 'xD6AClo-y3LlMBtAWYEaLZuzbUs',
    private_cdn: false,
    secure_distribution: null,
    secure: true
  });
const uploadFile = async(filePath, pubId) => {

    try {
        if(filePath && pubId){

            const result = await cloudinary.uploader.upload(filePath,{
                public_id: pubId,
                overwrite: true 
            });
            console.log('results:',result)
            return result;
        }else if (filePath ){
            
            const result = await cloudinary.uploader.upload(filePath);

            console.log('results:',result)
            return result;
        }
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    uploadFile
}