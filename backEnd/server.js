const fs = require("fs");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { VideosPath, ImagesPath, OtherPath, documentsPath } = require("./model/file-models");
dotenv.config();

const server = express();
server.use(cors());
server.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URL;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Determine the destination folder based on file type
        let destinationFolder = "others";

        if (file.mimetype.startsWith("image")) {
            destinationFolder = "images";
        } else if (file.mimetype.startsWith("application/pdf")) {
            destinationFolder = "documents";
        } else if (file.mimetype.startsWith("video")) {
            destinationFolder = "videos";
        }

        const destinationPath = path.join(uploadsDir, destinationFolder);

        // Create the destination folder if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath);
        }

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

server.post("/upload", upload.single("fileInput"), async (req, res) => {
    const type = req.file.mimetype.split("/")[0];

    switch (type.toLocaleLowerCase()) {
        case "image":
            await ImagesPath.create({ path: req.file.path });
            break;

        case "video":
            await VideosPath.create({ path: req.file.path });
            break;

        case "application":
            await documentsPath.create({ path: req.file.path });
            break;

        default:
            await OtherPath.create({ path: req.file.path });
            break;
    }

    return res.redirect("http://localhost:5173/upload");
});

server.get("/images", async (req, res) => {
    try {
        const imagesList = await ImagesPath.find();
        const imageSources = await Promise.all(imagesList.map(async (image) => {
            const imagePath = path.join(__dirname, image.path.slice(63));
            const imgBlob = fs.readFileSync(imagePath).toString("base64");
            return `data:image/jpeg;base64,${imgBlob}`;
        }));
        res.json({ imageSources });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("DB is connected");
        server.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((error) => console.log(error));
