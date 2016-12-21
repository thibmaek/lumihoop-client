module.exports.register = (server, options, next) => {
  const io = require(`socket.io`)(server.listener);
  let clients = [];

  io.on(`connection`, socket => {
    const client = { id: socket.id };
    clients.push(client);
    socket.emit(`clientsChanged`, clients);

    socket.on(`hoopPlaced`, ({ relX, relY, scale }) => {
      io.emit(`drawHoop`, { relX, relY, scale });
      console.log({ relX, relY, scale });
    });

    socket.on(`detectHit`, () => io.emit(`newTurn`));

    socket.on(`debug`, data => console.log(data));
  });

  io.on(`disconnect`, socket => {
    clients = clients.filter(c => c.id !== socket.id);
    socket.emit(`clientsChanged`, clients);
  });

  next();
};

module.exports.register.attributes = {
  name: `lumihoop`,
  version: `0.1.0`,
};
