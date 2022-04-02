import io from "socket.io-client";
// const ENDPOINT = 'http://localhost:3001';


const Socket=io.connect('http://localhost:3001');
export default Socket;