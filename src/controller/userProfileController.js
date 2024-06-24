const Profile = require("../models/userProfileModel");
require("dotenv").config();
const Upload = require("../CloudinaryImageUploader");

// upload {
//     asset_id: '2d52389e12266bd38b814b1555fdef6a',
//     public_id: 'jp7arsbc2duoh5b81vhc',
//     version: 1708334473,
//     version_id: '00f010844f22283ca853632a15d54634',
//     signature: '35212567826792e2ffda01d0e0643c9b7b2f096c',
//     width: 250,
//     height: 250,
//     format: 'jpg',
//     resource_type: 'image',
//     created_at: '2024-02-19T09:21:13Z',
//     tags: [],
//     bytes: 56641,
//     type: 'upload',
//     etag: '3129f5e04dbd1803e56561f3478056da',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/ds8wtc0yi/image/upload/v1708334473/jp7arsbc2duoh5b81vhc.jpg',
//     secure_url: 'https://res.cloudinary.com/ds8wtc0yi/image/upload/v1708334473/jp7arsbc2duoh5b81vhc.jpg',
//     folder: '',
//     api_key: '344266855257532'
//   }

function generateRandomUserName() {
  const minLength = 6; // Minimum length of the username
  const maxLength = 10; // Maximum length of the username
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";
  for (let i = 0; i < length; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return username;
}
//
//   console.log('random',randomUserName);

exports.setUserProfile = async (req, res) => {
  try {
    console.log("profile data", req.body);
    const uid = req?.body?.profileData?.uid;
    const path = req.body?.profileData?.profilePic;
    const username = req.body?.profileData?.username;
    const name = req.body?.profileData?.name;
    const randomUserName = await generateRandomUserName();
    // const name1 = await Profile.findOne({ name: name });
   const random =  !username ?  randomUserName : username;

    console.log('usrma hn haiaksjdflj', random);
    if (random != "") {
      const existingUser = await Profile.findOne({ username: random });
      console.log("data", existingUser);
      console.log("name", name);
      if (existingUser) {
        return res.json({ error: "Username already exists" });
      }
    }
    // if(name){
    //     return res.json({error:"name alredy exist"})
    // }

    if (path) {
      console.log("chl rhaa hn");
      const upload = await Upload.uploadFile(path);

      // console.log('upload', upload);
      if (upload?.secure_url || uid) {
        console.log(upload.secure_url);

        var store = new Profile({
          uid: uid,
          pic_url: upload?.secure_url,
          pic_asset_id: upload?.asset_id,
          pic_public_id: upload?.public_id,
          pic_created_at: upload?.created_at,
          price: req.body?.profileData?.price,
          name: req.body?.profileData?.name,
          username:random,
        });
        const profile = await store.save();
        res.send({
          succes: true,
          msg: "File Uploaded Successfully!",
          profileId: profile._id,
        });
      }
    } else {
      if (uid) {
        var store = new Profile({
          uid: uid,
          pic_url: "",
          pic_asset_id: "",
          pic_public_id: "",
          pic_created_at: "",
          price: req.body?.profileData?.price,
          name: req.body?.profileData?.name,
          username:random,
        });
        const profile = await store.save();
        res.send({
          succes: true,
          msg: "File Uploaded Successfully!",
          profileId: profile._id,
        });
      }
    }
  } catch (error) {
    res.send({ succes: false, msg: error.message });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (profiles == null) {
      return res.json({ error: "Profile not found" });
    }
    res.json({ message: "Profile found", data: profiles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProfileByUid = async (req, res) => {
  try {
    await res.profile.remove();
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProfileByUid = async (req, res) => {
  try {
    console.log(req.params);
    const profile = await Profile.findById(req.params.uid);
    // console.log(profile);
    if (profile == null) {
      return res.json({ error: "Profile not found" });
    }
    res.json({ message: "Profile found", data: profile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updatePicById = async (req, res) => {
  try {
    // const path = 'https://i.pinimg.com/280x280_RS/77/0f/b7/770fb75f5e81e4c2dbe8934f246aeeab.jpg'

    // const pubid = 'sviudjwrcxewsjlvqvxa'
    console.log("this is boday", req.body);

    const upload = await Upload.uploadFile(
      req.body.base64,
      req.body.pic_public_id
    );

    const id = req.params.uid;
    const user = await Profile.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          pic_url: upload?.secure_url,
          pic_asset_id: upload?.asset_id,
          pic_public_id: upload?.public_id,
          pic_created_at: upload?.created_at,
        },
      },
      { new: true }
    );

    res.send({ succes: true, msg: "change successful" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

exports.updateNameById = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.uid;
    const user = await Profile.findOneAndUpdate(
      { _id: id },
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.send({ succes: true, msg: "change successful" });
  } catch (error) {
    console.error("Error updating name:", error);
    throw error;
  }
};

// Update username field by id
exports.updateUsernameById = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.uid;
    console.log(id);
    const username = req.body.username;

    const existingUser = await Profile.findOne({ username: username });
    if (existingUser) {
      return res.json({ error: "Username already exists" });
    }

    const user = await Profile.findOneAndUpdate(
      { _id: id },
      { $set: { username: username } },
      { new: true }
    );
    res.send({ succes: true, msg: "change successful",data:user });
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

// Update pic_url field by id
exports.updatePriceById = async (req, res) => {
  try {
    const id = req.params.uid;
    const user = await Profile.findOneAndUpdate(
      { _id: id },
      { $set: { price: req.body.price } },
      { new: true }
    );
    res.send({ succes: true, msg: "change successful" });
  } catch (error) {
    console.error("Error updating pic_url:", error);
    throw error;
  }
};
