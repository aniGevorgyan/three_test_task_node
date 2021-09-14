class Functions {

    static requestError(res, error) {
        return res.status(error.status || 500).send({
            status: "error",
            message: error.message || error.message.toString(),
            stack: error.stack,
        })
    };

}

module.exports = Functions;
