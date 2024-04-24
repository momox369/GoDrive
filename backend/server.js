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
  id: { type: String, required: true },
  name: { type: String, required: true },
  size: Number,
  location: { type: String, required: true },
  url: String,
  reason: String,
  owner: [{ type: String, required: true }],
  type: { type: String, default: "file" },
  isStarred: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  sharedWith: [],
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
      type: isFolder ? "folders" : "files",
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
app.post(
  "/upload-folder",
  cors(corsOptions),
  upload.array("files"),
  async (req, res) => {
    req.files.forEach((file) => {
      const fullPath = path.join(__dirname, "uploads", file.originalname);
      const dir = path.dirname(fullPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.renameSync(file.path, fullPath);
    });

    res.json({ message: "Files uploaded successfully" });
  }
);

app.post("/create-folder", cors(corsOptions), async (req, res) => {
  const { folderName } = req.body;
  const uploadDate = new Date().toLocaleDateString();
  const reason = `Created on ${uploadDate}`;
  const folderPath = path.join(__dirname, "uploads", folderName); // Construct the directory path

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Ensure recursive is true to create directories within directories if needed
  }

  const folderMetadata = new File({
    id: uuidv4(),
    name: folderName,
    size: 0,
    location: `/uploads/${folderName}`,
    url: `http://localhost:${PORT}/uploads/${folderName}`,
    reason: reason,
    owner: "user@gmail.com",
    type: "folders",
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
        const filePath = path.join(
          __dirname,
          "uploads",
          path.basename(file.location)
        );
        const uploadsDir = path.join(__dirname, "uploads");
        if (!filePath.startsWith(uploadsDir)) {
          console.error(
            "Attempt to delete outside of uploads directory:",
            filePath
          );
          return { id, status: "Deletion not allowed" };
        }

        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }

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
  const { type } = req.query;
  try {
    const query = type
      ? { type: type, isDeleted: false }
      : { isDeleted: false };
    const files = await File.find(query);
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
        owner: file.owner,
        type: file.type,
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
app.get("/filter", async (req, res) => {
  const { type } = req.query;
  try {
    const query = type ? { type } : {};
    const files = await File.find(query);
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
        type: file.type,
      }))
    );
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).send("Error retrieving files");
  }
});

app.post("/toggle-star", async (req, res) => {
  const { id } = req.body;

  try {
    // Use findOne to search by your custom 'id' field instead of '_id'
    const file = await File.findOne({ id: id });
    if (!file) {
      return res.status(404).send("File not found");
    }
    file.isStarred = !file.isStarred;
    await file.save();
    res.json({ message: "Starred status updated", starred: file.isStarred });
  } catch (error) {
    console.error("Failed to toggle starred status:", error);
    res.status(500).send("Failed to update starred status");
  }
});

app.get("/starred", async (req, res) => {
  const { type } = req.query; // Optional type filter
  try {
    const query = type ? { isStarred: true, type: type } : { isStarred: true };
    const starredItems = await File.find(query);
    res.json(starredItems);
  } catch (error) {
    console.error("Error fetching starred files/folders:", error);
    res.status(500).send("Failed to fetch starred files/folders");
  }
});

app.post("/toggle-trash", async (req, res) => {
  const { ids } = req.body; // Expect an array of IDs

  try {
    const toggleTrashPromises = ids.map(async (id) => {
      const file = await File.findOne({ id: id });
      if (!file) {
        return { id: id, status: "File not found" };
      }
      file.isDeleted = !file.isDeleted; // Toggle the isDeleted flag
      await file.save();
      return {
        id: id,
        status: file.isDeleted ? "Marked as deleted" : "Restored",
      };
    });

    const results = await Promise.all(toggleTrashPromises);
    res.status(200).json(results);
  } catch (error) {
    console.error("Failed to toggle trash status:", error);
    res.status(500).send({ message: "Failed to update trash status", error });
  }
});

app.get("/trash", async (req, res) => {
  try {
    const trashedItems = await File.find({ isDeleted: true });
    res.json(
      trashedItems.map((file) => ({
        id: file.id,
        name: file.name,
        type: file.type,
        owner: file.owner,
        location: file.location,
        reason: file.reason,
      }))
    );
  } catch (error) {
    console.error("Error fetching trashed files/folders:", error);
    res.status(500).send("Failed to fetch trashed files/folders");
  }
});
app.post("/share", async (req, res) => {
  const { id, username } = req.body;
  try {
    const file = await File.findOne({ id: id });
    if (!file) {
      return res.status(404).send("File not found");
    }
    // Ensure not to add the username if it already exists
    if (!file.owner.includes(username)) {
      file.owner.push(username);
      await file.save();
      console.log(`File shared with ${username}`);
    }
    res.json(file);
  } catch (error) {
    console.error("Error sharing file:", error);
    res.status(500).send("Error sharing file");
  }
});
// Update file name endpoint
app.post("/update-filename", async (req, res) => {
  const { id, newName } = req.body;

  if (!id || !newName) {
    return res.status(400).send("File ID and new name are required.");
  }

  try {
    const file = await File.findOne({ id: id });
    if (!file) {
      return res.status(404).send("File not found");
    }

    file.name = newName; // Update the name
    await file.save(); // Save the updated file
    res.status(200).json({ message: "File name updated successfully", file });
  } catch (error) {
    console.error("Failed to update file name:", error);
    res.status(500).send("Error updating file name");
  }
});
app.get("/folder/:id", async (req, res) => {
  const folderId = req.params.id;

  try {
    // Assuming you have a function to find files by their folder ID
    const files = await File.find({
      parentFolderId: folderId,
      isDeleted: false,
    });
    res.json(files);
  } catch (error) {
    console.error("Error retrieving folder contents:", error);
    res.status(500).send("Error retrieving data");
  }
});
