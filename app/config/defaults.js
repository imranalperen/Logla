const path = require("path");

module.exports.DIRECTORY = path.join(__dirname, "../", "LOGLA");

module.exports.PREFIX = "LOGLA_";

module.exports.DEFAULT_SIZE = 5 * 1024 * 1024; // 5mb
module.exports.MAX_SIZE = this.DEFAULT_SIZE * 4; // 20mb

module.exports.DEFAULT_TIME = 24 * 60 * 60; // 1 day
module.exports.MAX_TIME = this.DEFAULT_TIME * 7; // 7 days

module.exports.LEVEL_DEFAULTS = ["DEBUG", "INFO", "WARN", "ERROR", "CRITICAL"];
