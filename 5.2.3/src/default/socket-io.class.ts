import {log} from "../core.decorator";
import {Server as IoServer} from "socket.io";

const ioObj: IoServer = new IoServer ({
  cors: {
    origin: "http://localhost:8080"
  }
});

class SocketIo extends IoServer {
  constructor() {
    super();
    return ioObj;
  }

  public static onEvent(event) {
    return (target, propertyKey) => {
      ioObj.on("connection", (socket) => {
        log("Connected");
        socket.on(event, (message) => {
          log("On Event", event);
          ioObj.emit("test", "test-from-server-1");
          target[propertyKey](socket, message);
        })
      })
      ioObj.listen(8085);
    }
  }
}

export {SocketIo}