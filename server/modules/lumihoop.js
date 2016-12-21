module.exports.register = (server, options, next) => {
  const io = require(`socket.io`)(server.listener);

  let clients = 0;

  io.on(`connection`, socket => {
    socket.emit(`clientsChanged`, { clients: clients += 1 });
    console.log(clients);

    socket.on(`hoopPlaced`, ({ relX, relY, scale }) => {
      io.emit(`drawHoop`, { relX, relY, scale });
      console.log({ relX, relY, scale });
    });

    socket.on(`detectHit`, () => io.emit(`newTurn`));

    socket.on(`disconnect`, () => {
      io.emit(`clientsChanged`, { clients: clients += 1 });
      console.log(clients);
    });

    socket.on(`debug`, data => console.log(data));
  });

  next();
};

module.exports.register.attributes = {
  name: `lumihoop`,
  version: `0.1.0`,
};
