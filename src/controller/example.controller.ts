

import { Request, Response } from 'express';

export const exampleGetController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from get controller!' });
};
export const examplePostController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from post controller!' });
};

export const exampleUploadController = (req: Request, res: Response) => {
  res.status(200).json({ message: 'File uploaded!' });
};