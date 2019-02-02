module.exports = (error, res) => {
  res.status(500).send({
    error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))),
  });
};

/* process.on('unhandledRejection', (reason, p) => {
  // application specific logging, throwing an error, or other logic here
}); */
