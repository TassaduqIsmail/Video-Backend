const express = require("express");
const router = express.Router();
const videoController = require("../controller/imageAndVideoController");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({
  storage,
  limits: {
    fileSize: 1000 * 1024 * 1024,
    files:  1000 * 1024 * 1024,
    fieldNameSize: 1000 * 1024 * 1024,
    fileSize: 1000 * 1024 * 1024,
    fields: 1000 * 1024 * 1024
  },
});

router.post("/upload", upload.single("video"), videoController.uploadVideo);
router.get("/image_videos", videoController.getAllVideos);
router.get("/videos/:id", videoController.getVideoById);
router.delete("/videos/:id", videoController.deleteVideoById);
router.put("/videos-ratings/:id", videoController.updateRatingsById);
router.put("/videos-likes/:id", videoController.updateLikesById);
router.put("/videos-views/:id", videoController.updateViewsById);

module.exports = router;
