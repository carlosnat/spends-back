module.exports = (error, req, res, next) => {
    res.status(500).send({
        error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    });
}