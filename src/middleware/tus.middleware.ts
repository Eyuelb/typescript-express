import { Request, Response, NextFunction } from "express";
import { tusServer } from "../config/tus.config";
import * as tus from 'tus-node-server';

export const tusUploadHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  tusServer.handle(req, res);
  tusServer.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    next();
    console.log(`Upload complete for file ${event.file.id}`);
    // You can add custom logic here when an upload is complete
  });
  tusServer.on(tus.EVENTS.EVENT_FILE_CREATED, (event) => {
    console.log(`Upload file created ${event.file.id}`);
    // You can add custom logic here when an upload is complete
  });
};
