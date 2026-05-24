import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

/**
 * Join User Room
 */
const user = JSON.parse(localStorage.getItem("user"));

if (user?._id) {
  socket.emit("joinRoom", user._id);
}

export default socket;
