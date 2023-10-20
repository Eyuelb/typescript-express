import { Request, Response } from "express";
export const exampleGetController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from get controller!" });
};
export const examplePostController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello from post controller!" });
};

export const exampleMinioWithMulterUploadController = (req: Request, res: Response) => {
  if (res.locals.etag) {
    res.status(200).json({
      message: "File uploaded successfully.",
      filename: req.file && req.file.filename ? req.file.filename : '', // Include the uploaded file name
      etag: res.locals.etag, // Include the etag value
    });
  } else {
    res.status(400).json({ message: "File upload failed." });
  }
};

