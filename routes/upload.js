import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkImgFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

function checkDocFileType(file, cb) {
  const filetypes = /docx|doc|pdf|ppt|pptx|xlx|xlxs|txt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Documents only!");
  }
}

const uploadImg = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkImgFileType(file, cb);
  },
});

const uploadDoc = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkDocFileType(file, cb);
  },
});

router.post("/image", uploadImg.single("image"), (req, res) => {
  console.log("uploading image");
  res.send(`/${req.file.path}`);
});

router.post("/document", uploadDoc.single("document"), (req, res) => {
  console.log("uploading document");
  res.send(`/${req.file.path}`);
});

export default router;
