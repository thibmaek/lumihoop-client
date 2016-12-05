module.exports.register = (server, options, next) => {

  const io = require(`socket.io`)(server.listener);

  const users = [];

  io.on(`connection`, socket => {

    const { id: socketId } = socket;
    console.log(socketId);

    const user = {
      socketId,
    };

    users.push(user);
    console.log(users);

    socket.on(`hoopPlaced`, ({ pageX, pageY, scale }) => {
      io.emit(`drawHoop`, { pageX, pageY, scale });
      console.log({ pageX, pageY, scale });
    });

  });

  next();

};

module.exports.register.attributes = {
  name: `lumihoop`,
  version: `0.1.0`,
};
