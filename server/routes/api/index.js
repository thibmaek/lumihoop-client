const dgram = require(`dgram`);
const udp = dgram.createSocket(`udp4`);

module.exports = [
  {
    method: `GET`,
    path: `/api/udp`,
    handler: (req, res) => res(
      udp.on(`message`, (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      })
    ),
  },
];
