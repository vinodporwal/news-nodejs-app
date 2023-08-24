const whitelist = ['http://localhost:4006', 'http://localhost:3006'];

export default {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
