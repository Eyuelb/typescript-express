
import * as tus from "tus-node-server";
import { bucketName, minioClient } from "./minio.config";

//minio store configuration data to be used as S3Store
const store = {
  partSize: 8 * 1024 * 1024, // Each uploaded part will have ~8MB,
  bucket: bucketName,
  accessKeyId: process.env.MINIO_ROOT_USER || "",
  secretAccessKey: process.env.MINIO_ROOT_PASSWORD || "",
  endpoint: "http://localhost:9000",
  s3ForcePathStyle: true,
};


const serverOptions = {
  path: "/upload/tus/test",
};
const tusServer = new tus.Server(serverOptions);

tusServer.datastore = new tus.S3Store(store);

export { tusServer };
