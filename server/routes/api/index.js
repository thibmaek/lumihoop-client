module.exports = [
  {
    method: `GET`,
    path: `/api/{param*}`,
    handler: {
      directory: {
        path: `.`,
        redirectToSlash: true,
        index: true,
      },
    },
  },
  {
    method: `POST`,
    path: `/api/{param*}`,
    handler: {
      directory: {
        path: `.`,
        redirectToSlash: true,
        index: true,
      },
    },
  },
];
