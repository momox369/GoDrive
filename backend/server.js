const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require("fs");

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });

const fileSchema = new mongoose.Schema({
  id: { type: String },
  name: String,
  size: Number,
  location: String,
  url: String,
  reason: String,
  owner: String,
  type: { type: String, default: "file" },
});

const File = mongoose.model("File", fileSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/upload",
  cors(corsOptions),
  upload.single("file"),
  async (req, res) => {
    const isFolder = req.query.isFolder;
    const { filename, size } = req.file;
    const uploadDate = new Date().toLocaleDateString();
    const reason = `Uploaded on ${uploadDate}`;

    const fileMetadata = new File({
      id: uuidv4(),
      name: filename,
      size: size,
      location: `/uploads/${filename}`,
      url: `http://localhost:${PORT}/uploads/${filename}`,
      reason: reason,
      owner: "user@gmail.com",
      type: isFolder ? "folder" : "file",
    });

    try {
      await fileMetadata.save();
      res.json(fileMetadata);
    } catch (error) {
      console.error("Error saving file metadata:", error);
      res.status(500).send("Error saving file metadata");
    }
  }
);

app.post("/create-folder", cors(corsOptions), async (req, res) => {
  const { folderName } = req.body;
  const folderMetadata = new File({
    id: uuidv4(),
    name: folderName,
    size: 0,
    location: "",
    url: "",
    reason: "Folder created",
    owner: "user@gmail.com",
    type: "folder",
  });

  try {
    await folderMetadata.save();
    res.json(folderMetadata);
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).send("Error creating folder");
  }
});

app.delete("/delete", async (req, res) => {
  const { ids } = req.body;
  try {
    const deletePromises = ids.map(async (id) => {
      const file = await File.findOne({ id: id });
      if (file) {
        fs.unlinkSync(path.join(__dirname, file.location));
        await File.deleteOne({ id: id });
        return { id, status: "Deleted successfully" };
      }
      return { id, status: "File not found" };
    });

    const results = await Promise.all(deletePromises);
    res.status(200).send(results);
  } catch (error) {
    console.error("Error deleting files:", error);
    res.status(500).send({ message: "Failed to delete files", error });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(
      files.map((file) => ({
        id: file.id,
        name: file.name,
        size: file.size,
        location: file.location,
        url: file.url,
        reason:
          "Uploaded on " +
          new Date(file._id.getTimestamp()).toLocaleDateString(),
        owner: "user@gmail.com",
      }))
    );
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).send("Error retrieving files");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
