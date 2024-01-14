const path = require("path");

module.exports.FOLDER_DEFAULTS = {
    FOLDER: path.join(__dirname, "/"),
    NAME: "LOGLA",
};

module.exports.FILE_DEFAULTS = {
    DATE_TYPES: {
        JS_DATE: "JS_DATE",
        UNIX: "UNIX",
    },
    PREFIX: "[LOGLA]: ",
};

module.exports.SIZE_DEFAULTS = {
    Five_MB: 5 * 1024 * 1024,
    Twenty_MB: 20 * 1024 * 1024,
};

module.exports.TIME_DEFAULTS = {
    Daily: 24 * 60 * 60,
    Weekly: 7 * 24 * 60 * 60,
};
