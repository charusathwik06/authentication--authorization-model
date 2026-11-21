
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    console.error("Request failed:", err.message);

    return res.status(500).json({
        message: "Internal server error"
    });
}

module.exports = errorHandler;
