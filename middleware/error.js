module.exports = (error, req, res, next) => {
    res.status(500).send({
        error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    });
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});