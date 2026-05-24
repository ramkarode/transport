const { Server } = require(
  "socket.io",
);

let io;

/**
 * Store Connected Users
 */
const onlineUsers = {};

/**
 * Initialize Socket Server
 */
const initSocket =
  (server) => {

    io = new Server(server, {
      cors: {
        origin:
          "http://localhost:5173",

        credentials: true,
      },
    });

    io.on(
      "connection",
      (socket) => {

        console.log(
          `⚡ Client Connected: ${socket.id}`,
        );

        /**
         * Join User Room
         */
        socket.on(
          "joinRoom",
          (userId) => {

            onlineUsers[userId] =
              socket.id;

            socket.join(userId);

            console.log(
              `✅ User Joined Room: ${userId}`,
            );
          },
        );

        /**
         * Disconnect
         */
        socket.on(
          "disconnect",
          () => {

            console.log(
              `❌ Client Disconnected: ${socket.id}`,
            );

            /**
             * Remove Offline User
             */
            for (const userId in onlineUsers) {

              if (
                onlineUsers[userId] ===
                socket.id
              ) {

                delete onlineUsers[userId];

                break;
              }
            }
          },
        );
      },
    );
  };

/**
 * Get Socket Instance
 */
const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.io not initialized",
    );
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};