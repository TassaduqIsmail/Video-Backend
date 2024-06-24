
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'ds8wtc0yi',
    api_key: '344266855257532',
    api_secret: 'xD6AClo-y3LlMBtAWYEaLZuzbUs',
    private_cdn: false,
    secure_distribution: null,
    secure: true
});

const uploadFile = async (filePath, type, username) => {

    try {

        const uploadOptions = {
            folder: username?.trim() || 'random'
        };

        if (type === 'image') {

            const result = await cloudinary.uploader.upload(filePath, uploadOptions);
            console.log('results:', result)
            return result;
        } else if (type === 'video/mp4') {
            const result = await cloudinary.uploader.upload(filePath, {
                resource_type: 'video',
                folder: username?.trim() || 'random'
            });


            console.log('results:', result)
            return result;

        }




    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    uploadFile
}