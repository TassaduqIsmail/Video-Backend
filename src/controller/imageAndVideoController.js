const Upload = require("./cloudinaryUpload");
const Video = require('../models/imageAndVideoModel');

const cloudinary = require("cloudinary").v2;



exports.uploadVideo = async (req, res) => {
          console.log(req.body);
    try {
      
        const type = req?.body?.type
        const username = req?.body?.username
        const uid = req?.body?.uid
        const base64 = req?.body?.base64
        const duration = req?.body?.duration

    //     console.log(type, username);
        const upload = await Upload.uploadFile(base64, type, username);

        console.log('upload', upload);

        if (upload?.secure_url && type === 'image') {
            console.log('img');

            var store = new Video({
                 uid: uid,
                pic_url: upload?.secure_url,
                pic_asset_id: upload?.asset_id,
                pic_public_id: upload?.public_id,
                pic_created_at: upload?.created_at,
                pic_format: upload?.format,
                pic_type: type,
                likes: 0,
                views: 0,
                ratings: [],
                likedBy: []

            });
            const data = await store.save();
            console.log("image data",data);
            res.send({ succes: true, msg: 'Image Uploaded Successfully!', data: data });
        }
        else if (upload?.secure_url && type === 'video/mp4') {
            console.log('video', upload?.secure_url && type === 'video/mp4');

            var store = new Video({
                 uid: uid,
                pic_url: upload?.secure_url,
                pic_asset_id: upload?.asset_id,
                pic_public_id: upload?.public_id,
                pic_created_at: upload?.created_at,
                pic_format: upload?.format,
                duration: duration,
                likes: 0,
                views: 0,
                ratings: [],
                likedBy: []

            });
            const data = await store.save();

            console.log("video data",data);
            res.send({ succes: true, msg: 'Video Uploaded Successfully!', data: data });
        }
     

        console.log(upload.secure_url);

        // var store = new Profile({
        //     uid: req.body?.profileData?.uid,

        // });
        // const profile = await store.save();
        // res.send({ succes: true, msg: 'File Uploaded Successfully!', profileId: profile._id });


    } catch (error) {
        res.send({ succes: false, msg: error.message });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteVideoById = async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted successfully', video: deletedVideo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateViewsById = async (req, res) => {
    const { id } = req.params;
    const { uid, rating, likes, views, count } = req.body;
    console.log(req.body);
    console.log('id views', id);


    try {
        let picOrVideo = await Video.findById(id);

        if (!picOrVideo) {
            return res.status(404).json({ error: "Picture not found" });
        }
        picOrVideo.views += 1;
        await picOrVideo.save();

        res.json({ message: "View impression recorded successfully" });
    } catch (error) {
        console.error('Error recording view impression:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateRatingsById = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid, rating, likes, views, count } = req.body;
        console.log(req.body);

        // Find the picture or video by its ID
        let picOrVideo = await Video.findById(id);

        if (!picOrVideo) {
            return res.json({ error: "Picture or video not found" });
        }

        // Update ratings
        if (rating !== undefined && rating !== '') {
            let existingRatingIndex = picOrVideo.ratings.findIndex(rating => rating.uid.equals(uid));

            if (existingRatingIndex !== -1) {
                picOrVideo.ratings[existingRatingIndex].rate = rating;
            } else {
                picOrVideo.ratings.push({ uid, rate: rating });
            }
        }

        // Update likes
        // if (likes !== undefined && likes !== '') {
        //     if (count == 0) {
        //         if (picOrVideo.likes.includes(likes)) {
        //             // If the user ID exists, remove it from the likes array
        //             picOrVideo.likes = picOrVideo.likes.filter(userId => userId !== uid);
        //         }
        //     }

        //     else if (count == 1) {
        //         // If the user ID doesn't exist, add it to the likes array
        //         picOrVideo.likes.push(likes);
        //     }
        // }

        // Update views
        // if (views !== undefined) {
        //     // Update views count
        //     picOrVideo.views = views;
        // }

        await picOrVideo.save();

        res.json({ message: "Rating, likes, and views updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

};
exports.updateLikesById = async (req, res) => {
    const { id } = req.params;
    const { uid, likeAction } = req.body;
    console.log(req.body);


    try {
        let picOrVideo = await Video.findById(id);

        if (!picOrVideo) {
            return res.json({ error: "Picture not found" });
        }

        const isLiked = picOrVideo.likedBy.includes(uid);

        if (isLiked) {
            picOrVideo.likes -= 1;
            picOrVideo.likedBy = picOrVideo.likedBy.filter(id => id !== uid);
        } else {
            picOrVideo.likes += 1;
            picOrVideo.likedBy.push(uid);
        }

        await picOrVideo.save();

        res.json({ message: "Like action processed successfully" });
    } catch (error) {
        console.error('Error processing like action:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
