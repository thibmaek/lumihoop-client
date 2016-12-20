module.exports.register = (server, options, next) => {
  const io = require(`socket.io`)(server.listener);

  io.on(`connection`, socket => {
    socket.on(`hoopPlaced`, ({ relX, relY, scale }) => {
      io.emit(`drawHoop`, { relX, relY, scale });
      console.log({ relX, relY, scale });
    });

    socket.on(`detectHit`, () => io.emit(`newTurn`));

    socket.on(`debug`, data => console.log(data));
  });

  next();
};

module.exports.register.attributes = {
  name: `lumihoop`,
  version: `0.1.0`,
};
