import mongoose from "mongoose";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
export const fileUpload = (fieldName = "img") => {
  const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, "uploads/");
    },
    filename:  (req, file, cb)=> {
      cb(null, new mongoose.Types.ObjectId + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image"))
      return cb(new AppError("images only"), false);
    cb(null, true);
  }

  const upload = multer({ storage, fileFilter });
    return upload
};

    export const uploadSingleFile =fieldName => fileUpload().single(fieldName);
    export const uploadArrayOfFiles =fieldName => fileUpload().array(fieldName,10);
    export const uploadFields =fields => fileUpload().fields(fields);

