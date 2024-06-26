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
const bcrypt = require("bcryptjs");
const session = require("express-session");
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "DELETE"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const uri = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: Number,
  location: { type: String, required: true },
  url: String,
  reason: String,
  owner: { type: String, required: true },
  type: { type: String, default: "files" },
  isStarred: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  mimeType: { type: String },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    optional: true,
  }, // Parent folder ID
  contents: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }], // Only for folders
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

app.use(
  session({
    secret: SESSION_SECRET, // Ensure this is set and consistent
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
const File = mongoose.model("File", fileSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.parentId) {
      File.findById(req.body.parentId, (err, parentFolder) => {
        if (err || !parentFolder) {
          cb(new Error("Parent folder not found"));
        } else {
          const uploadPath = path.join(
            __dirname,
            "uploads",
            parentFolder.location
          );
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        }
      });
    } else {
      const uploadPath = path.join(__dirname, "uploads");
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
  onFileUploadStart: function (file) {
    file.extension = path.extname(file.originalname).toLowerCase();
  },
});

const upload = multer({ storage: storage });

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .send("A user with the same email or username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).send("Error registering new user");
  }
});

app.post("/login/email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("No account with that email address.");
    }
    req.session.user = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    res.send("Email verified, please proceed to password.");
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login/password", async (req, res) => {
  const { password, rememberMe } = req.body;

  if (!req.session.user || !req.session.user.id) {
    return res.status(401).send("Session expired or invalid.");
  }

  try {
    const user = await User.findById(req.session.user.id).select("+password");
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isMatch = await user.isValidPassword(password);
    if (isMatch) {
      // Extend session if remember me is checked
      if (rememberMe) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
      } else {
        req.session.cookie.maxAge = 1000 * 60 * 60; // 1 hour
      }
      res.send("Authenticated successfully.");
    } else {
      res.status(401).send("Invalid password.");
    }
  } catch (error) {
    console.error("Password verification error:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/current-user", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).send("No user is currently signed in.");
  }

  try {
    const user = await User.findById(req.session.user.id).select("+password");
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json({
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post(
  "/upload",
  cors(corsOptions),
  upload.array("files", 10),
  async (req, res) => {
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    let parentId = req.body.parentId;
    console.log("ID: ", parentId);
    if (parentId === "null" || parentId === "undefined" || !parentId) {
      parentId = null;
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    let parentFolder = null;
    if (parentId) {
      parentFolder = await File.findById(parentId);
      console.log(parentFolder);
      if (!parentFolder || parentFolder.type !== "folders") {
        return res.status(400).send("Invalid or missing parent folder.");
      }
    }

    try {
      const fileMetadatas = req.files.map(async (file) => {
        const newFile = new File({
          name: file.originalname,
          size: file.size,
          location: `/uploads/${
            parentId
              ? `${parentFolder.location}/${file.filename}`
              : file.filename
          }`,
          url: `http://localhost:${PORT}/uploads/${
            parentId
              ? `${parentFolder.location}/${file.filename}`
              : file.filename
          }`,
          reason: `Uploaded on ${new Date().toLocaleDateString()}`,
          owner: req.session.user.username,
          mimeType: file.mimetype,
          type: "files",
          parentId: parentId,
        });
        if (parentId) {
          parentFolder.contents.push(newFile._id);
          await parentFolder.save();
        }
        return await newFile.save();
      });

      const savedFiles = await Promise.all(fileMetadatas);

      res.json({ message: "Files uploaded successfully", files: savedFiles });
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
      const fullPath = path.join(__dirname, "uploads", file.name);
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
  const { folderName, parentId = null } = req.body;
  const uploadDate = new Date().toLocaleDateString();
  const reason = `Created on ${uploadDate}`;
  let parentFolder;

  if (parentId) {
    parentFolder = await File.findById(parentId);
    if (!parentFolder || parentFolder.type !== "folders") {
      return res.status(400).send("Invalid parent folder ID");
    }
  }

  const folderPath = parentId
    ? path.join(__dirname, "uploads", parentFolder.location, folderName)
    : path.join(__dirname, "uploads", folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const folderMetadata = new File({
    name: folderName,
    size: 0,
    location: parentId ? `${parentFolder.location}/${folderName}` : folderName,
    url: `http://localhost:${PORT}/uploads/${
      parentId ? `${parentFolder.location}/${folderName}` : folderName
    }`,
    reason: reason,
    owner: req.session.user.username,
    type: "folders",
    parentId: parentId,
  });

  try {
    await folderMetadata.save();
    if (parentId) {
      parentFolder.contents.push(folderMetadata._id);
      await parentFolder.save();
    }
    res.json(folderMetadata);
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).send("Error creating folder");
  }
});

app.delete("/delete", async (req, res) => {
  const { ids } = req.body;
  try {
    const deletePromises = ids.map(async (_id) => {
      const file = await File.findById(_id);
      console.log(file);
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
          return { _id, status: "Deletion not allowed" };
        }
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
        await File.deleteOne({ _id: _id });
        return { _id, status: "Deleted successfully" };
      }
      return { _id, status: "File not found" };
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
  const { type, extension } = req.query;
  try {
    const user = await User.findOne({ email: req.session.user.email });
    console.log(user.email);
    if (!user) {
      res.status(400).send("User Not Found");
    }
    const query = type
      ? {
          owner: user.username,
          type: type,
          isDeleted: false,
          ...(extension && { extension }),
        }
      : {
          owner: user.username,
          isDeleted: false,
          ...(extension && { extension }),
        };

    const files = await File.find(query);

    res.json(
      files.map((file) => ({
        _id: file._id.toString(),
        name: file.name,
        size: file.size,
        location: file.location,
        url: file.url,
        reason:
          "Uploaded on " +
          new Date(file._id.getTimestamp()).toLocaleDateString(),
        owner: file.owner,
        mimeType: file.mimeType,
        type: file.type,
      }))
    );
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).send("Error retrieving files");
  }
});

app.get("/folder-contents/:folderId", async (req, res) => {
  const folderId = req.params.folderId;
  try {
    const folder = await File.findById(folderId);
    if (!folder) {
      return res.status(404).send("Folder not found");
    }
    if (folder.type !== "folders") {
      return res.status(400).send("Specified ID is not a folder");
    }

    const contents = await File.find({ _id: { $in: folder.contents } });

    const results = contents.map((file) => ({
      _id: file._id,
      name: file.name,
      type: file.type,
      location: file.location,
      url: file.url,
      owner: file.owner,
      mimeType: file.mimeType,
      isStarred: file.isStarred,
      isDeleted: file.isDeleted,
    }));

    res.json({
      folderName: folder.name,
      contents: results,
    });
  } catch (error) {
    console.error("Failed to fetch folder contents:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/filter", async (req, res) => {
  const { type } = req.query;
  try {
    const query = type ? { type } : {};
    const files = await File.find(query);
    console.log(query);
    res.json(
      files.map((file) => ({
        id: file._id,
        name: file.name,
        size: file.size,
        location: file.location,
        mimeType: file.mimeType,
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
    const file = await File.findById(id);
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
  if (!req.session.user) {
    return res.status(401).send("User not signed in.");
  }
  const { type } = req.query;
  try {
    const query = {
      owner: req.session.user.username,
      isStarred: true,
      ...(type && { type: type }),
    };
    const starredItems = await File.find(query);
    res.json(starredItems);
  } catch (error) {
    console.error("Error fetching starred files/folders:", error);
    res.status(500).send("Failed to fetch starred files/folders");
  }
});

app.post("/toggle-trash", async (req, res) => {
  const { ids } = req.body;
  try {
    const toggleTrashPromises = ids.map(async (id) => {
      const file = await File.findById(id);
      if (!file) {
        return { id, status: "File not found" };
      }
      file.isDeleted = !file.isDeleted;
      await file.save();
      return {
        id: file._id,
        status: file.isDeleted ? "Marked as deleted" : "Restored",
      };
    });

    const results = await Promise.all(toggleTrashPromises);
    res.status(200).json(results);
  } catch (error) {
    console.error("Failed to toggle trash status:", error);
    res.status(500).send("Failed to update trash status");
  }
});

app.get("/trash", async (req, res) => {
  try {
    const trashedItems = await File.find({
      owner: req.session.user.username,
      isDeleted: true,
    });
    res.json(
      trashedItems.map((file) => ({
        _id: file._id,
        name: file.name,
        type: file.type,
        owner: file.owner,
        location: file.location,
        mimeType: file.mimeType,
        reason: file.reason,
      }))
    );
  } catch (error) {
    console.error("Error fetching trashed files/folders:", error);
    res.status(500).send("Failed to fetch trashed files/folders");
  }
});

app.post("/update-filename", async (req, res) => {
  const { id, newName } = req.body;

  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).send("File not found");
    }

    file.name = newName;
    await file.save();
    res.status(200).json({ message: "File name updated successfully", file });
  } catch (error) {
    console.error("Failed to update file name:", error);
    res.status(500).send("Error updating file name");
  }
});

app.post("/share-file", async (req, res) => {
  const { fileId, userId } = req.body;

  if (!fileId || !userId) {
    return res.status(400).send("Missing file ID or user ID");
  }

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).send("File not found");
    }
    if (!file.sharedWith.includes(userId)) {
      file.sharedWith.push(userId);
      await file.save();
    }
    res.status(200).send("File shared successfully");
  } catch (error) {
    console.error("Failed to share file:", error);
    res.status(500).send("Error sharing file");
  }
});

app.get("/files-shared-with-me", async (req, res) => {
  const userId = req.session.user.id;
  const { type } = req.query;

  try {
    let query = { sharedWith: userId };
    if (type) {
      query.type = type;
    }

    const files = await File.find(query);
    res.json(files);
  } catch (error) {
    console.error("Error fetching shared files:", error);
    res.status(500).send("Error fetching shared files");
  }
});

app.get("/search-users", async (req, res) => {
  const searchQuery = req.query.query;
  try {
    const regex = new RegExp(searchQuery, "i");
    const users = await User.find({
      $or: [{ email: { $regex: regex } }, { username: { $regex: regex } }],
    }).select("email username _id");
    res.json(users);
  } catch (error) {
    console.error("Error searching for users:", error);
    res.status(500).send("Error searching for users");
  }
});

app.get("/files/basic-search", async (req, res) => {
  const { query } = req.query;
  if (!req.session.user || !req.session.user.username) {
    return res.status(401).send("Unauthorized: No user logged in.");
  }

  try {
    const results = await File.find({
      owner: req.session.user.username,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Failed to search files" });
  }
});

app.get("/files/advanced-search", async (req, res) => {
  const { type, owner, words, itemName, location, inTrash, starred } =
    req.query;
  let query = {};

  if (type && type !== "Any") query.type = type;
  if (owner && owner !== "Anyone") query.owner = owner;
  if (words) query.$text = { $search: words };
  if (itemName) query.name = { $regex: itemName, $options: "i" };
  if (location && location !== "Anywhere") query.location = location;
  if (inTrash !== undefined)
    query.isDeleted = inTrash === "true" ? true : false;
  if (starred !== undefined)
    query.isStarred = starred === "true" ? true : false;

  try {
    const results = await File.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/files/search", async (req, res) => {
  const { mimeType, owner, date } = req.query;
  let query = {};
  if (mimeType) query.mimeType = mimeType;
  if (owner) query.owner = owner;
  if (date) query.date = { $gte: new Date(date).toISOString() };

  try {
    const files = await File.find(query);
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Error searching for files", error });
  }
});
app.listen(3001, () => {
  console.log("Server running on port 3001");
});