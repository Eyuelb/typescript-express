
import * as tus from "tus-node-server";

const serverOptions = {
  path: "/upload/tus/test",
};
const tusServer = new tus.Server(serverOptions);

tusServer.datastore = new tus.FileStore({
  directory: 'C:/Users/eyuel/Desktop/typescript/files'
});
export { tusServer };
