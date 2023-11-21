const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const { ImagesList } = require("./model/images-model");
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json({ limit: "10mb" }));

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URL;

const uploadsDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const dirPath = path.join(__dirname, "images");

server.get("/images", (req, res) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            const imageSources = files.map((file) => {
                const imagePath = path.join(dirPath, file);
                const imgBlob = fs.readFileSync(imagePath).toString("base64");
                return `data:image/jpeg;base64,${imgBlob}`;
            });
            res.json({ imageSources });
        }
    });
});

server.post("/upload", async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: "Image data not provided" });
        }

        const imageBuffer = Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );

        const fileName = `image_${Date.now()}.jpg`;
        const filePath = path.resolve(uploadsDir, fileName);

        // Use asynchronous file write operation
        fs.writeFileSync(filePath, imageBuffer);

        // Save file path in MongoDB
        const imagePathInDB = `/images/${fileName}`;
        await ImagesList.create({ imageUrl: imagePathInDB });

        res.status(200).json({ message: "File uploaded successfully", imagePath: imagePathInDB });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("DB is conneted");
        server.listen(port, () => {
            console.log(`server is running on port: ${port}`);
        });
    })
    .catch((error) => console.log(error));
