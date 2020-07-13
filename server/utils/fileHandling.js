const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

aws.config.update({
  secretAccessKey: "ACCESSKEY",
  accessKeyId: "ACCESSID",
  region: "REGION",
});
const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: "YOURBUCKETNAME",
  acl: "public-read",

  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(
      null,
      uuidv4() + Date.now().toString() + path.extname(file.originalname)
    );
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

exports.uploadresume = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkResumeType(file, cb);
  },
}).single("resume");

checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    return cb({ message: "Error: Images only!!" });
  }
};

checkResumeType = (file, cb) => {
  if (file.mimetype === "application/pdf") {
    return cb(null, true);
  } else {
    return cb({ message: "Error: PDF's only!!" });
  }
};
