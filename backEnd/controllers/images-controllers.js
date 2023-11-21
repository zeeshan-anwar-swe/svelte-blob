const { ImagesList } = require("../model/images-model");

const uploadToDB = async (req, res) => {
    const clientImage = {
        image: req.body.image,
    };
    try {
        const image = await ImagesList.create(clientImage);
        res.status(200).json("Image Saved in DB");
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllImages = async (req, res) => {
    try {
        const imagesList = await ImagesList.find();
        response.status(200).json(imagesList);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
};
