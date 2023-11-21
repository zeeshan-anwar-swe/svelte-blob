const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Please add a list"],
    },
});

const ImagesList = mongoose.model("images", imageSchema);
module.exports = {
    ImagesList,
};
