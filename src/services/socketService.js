import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'], // Use polling or websocket as fallback
  withCredentials: true
});

export default socket;