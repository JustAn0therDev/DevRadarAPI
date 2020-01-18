import socketio from "socket.io";
import parseStringAsArray from './utils/parseStringAsArray';
import calculateDistance from "./utils/calculateDistance";

let io;
let connections = [];

function setupWebSocket(server) {
    io = socketio(server);

    //Criacao do evento de conexao
    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs, ', ')
        })
    });
};

function findConnections(coordinates, techs) {
    return connections.filter((item) => {
        return calculateDistance(coordinates, item.coordinates) < 10
        && techs.some(item => techs.includes(item))
    })
}

function sendMessage(to, message, data) {
    if(to.length > 0) {
        to.forEach(connection => {
            io.to(connection.id).emit(message, data);
        });
    }
}

export {
    sendMessage, 
    findConnections,
    setupWebSocket
}