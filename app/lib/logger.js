const { LEVEL_DEFAULTS } = require("../config/defaults");
const { logDateFormat } = require("../utils/date_formatters");
const { Rolling } = require("./rolling");

class Logger {
    #file;
    #roll_configs;
    #file_name;
    #file_handler;

    constructor(file, roll_configs, file_name, file_handler) {
        this.#file = file;
        this.#roll_configs = { ...roll_configs };
        this.#file_name = file_name;
        this.#file_handler = file_handler;
    }

    /**
     * @param {string} string The log which writeing the file.
     * @param {string} level Level of log. Defaultly "DEBUG". Must be an element of ./configs/defaults.js/LEVEL_DEFAULTS Array which ["DEBUG", "INFO", "WARN", "ERROR", "CRITICAL"];
     */
    async log(string, level) {
        this.#file = await Rolling.checkRolls(this.#roll_configs, this.#file, this.#file_name, this.#file_handler);

        if (!this.#file.fd) {
            throw new Error(`Unexpected error at Logger.log(): File descriptor is not defined.`);
        }

        if (level && LEVEL_DEFAULTS.includes(level.toUpperCase())) {
            throw new Error(`Unsupported log level: ${JSON.stringify(level)}`);
        }
        if (!level) level = "DEBUG";

        const date = logDateFormat();
        const log_message = `[${date}] [${level}]: ${string}\n`;
        await this.#file.write(log_message);
    }
}

module.exports = { Logger };
