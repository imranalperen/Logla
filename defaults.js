const path = require("path");

module.exports.FOLDER_DEFAULTS = {
    FOLDER: path.join(__dirname, "/"),
    NAME: "LOGLA",
};

module.exports.FILE_DEFAULTS = {
    PREFIX: "LOGLA_",
};

module.exports.SIZE_DEFAULTS = {
    Five_MB: 5 * 1024 * 1024,
    Twenty_MB: 20 * 1024 * 1024,
};

module.exports.TIME_DEFAULTS = {
    Daily: 24 * 60 * 60,
    Weekly: 7 * 24 * 60 * 60,
};

module.exports.LEVEL_DEFAULTS = ["DEBUG", "INFO", "WARN", "ERROR", "CRITICAL"];
