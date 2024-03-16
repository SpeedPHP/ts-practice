import { resource, getMapping, log, component, SocketIo } from "../../src/typespeed";
@component
export default class TestIo {

    @resource()
    socketIo: SocketIo;

    @SocketIo.onEvent("test")
    connection(socket, message) {
        log(message)
        this.socketIo.sockets.emit("test", "test-from-server-2");
        socket.emit("test", "test-from-server-3");
    }

    @getMapping("/socket.html")
    socketPage(req, res) {
        res.render("socket");
    }
}