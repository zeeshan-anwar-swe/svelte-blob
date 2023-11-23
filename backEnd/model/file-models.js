const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    path: {
        type: String,
        required: [true, "Please add a video"],
    },
});

const imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: [true, "Please add a video"],
    },
});

const documentSchema = mongoose.Schema({
    path: {
        type: String,
        required: [true, "Please add a video"],
    },
});

const otherSchema = mongoose.Schema({
    path: {
        type: String,
        required: [true, "Please add a video"],
    },
});

const VideosPath = mongoose.model("videos", videoSchema);
const ImagesPath = mongoose.model("images", imageSchema);
const documentsPath = mongoose.model("documents", imageSchema);
const OtherPath = mongoose.model("other", imageSchema);
module.exports = {
    VideosPath,
    ImagesPath,
    documentsPath,
    OtherPath,
};
