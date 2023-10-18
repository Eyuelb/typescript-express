import { Request, Response, NextFunction } from "express";
import multer from "multer";

// Set up a storage engine using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const multerUploadHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  upload.single("file")(req, res, async (err) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
      return next();
  });
