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
const {urlencoded} = require("express");
app.use(express.json());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
const bcrypt = require("bcryptjs");
require("dotenv").config();

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
  owner: [String],
  type: { type: String, default: "file" },
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

const User = mongoose.model('User', UserSchema);

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
            owner: ["user@gmail.com"], // Initialize owner as an array
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
    owner: ["user@gmail.com"],
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
    const query = type ? { type: type } : {};
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
        owner: ["user@gmail.com"],
        type: file.type,
      }))
    );
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).send("Error retrieving files");
  }
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
        owner: ["user@gmail.com"],
        type: file.type,
      }))
    );
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).send("Error retrieving files");
  }
});

//share file with someone: add a string username to the owner array
app.post("/share", async (req, res) => {
    console.log("Request body:", req.body);
    const { id, username } = req.body;
    try {
        const file = await File.findOne({ id: id }).exec();
        if (file) {
            if (Array.isArray(file.owner)) {
                file.owner.push(username); // Push new owner to owner array
            } else {
                file.owner = [username]; // Initialize owner as an array with username
            }
            await file.save();
            res.json(file);
            console.log("File shared with " + username);
        } else {
            res.status(404).send("File not found");
        }
    } catch (error) {
        console.error("Error sharing file:", error);
        res.status(500).send("Error sharing file");
    }
});

app.post("/forgotpassword", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Check if the user exists with the provided email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedPassword;
        await user.save();

        // Respond with success message
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
