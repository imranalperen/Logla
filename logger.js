const { Rolling } = require("./rolling");

const { LEVEL_DEFAULTS } = require("./defaults");
const { logDateFormat } = require("./utils");

class Logger {
    #file;

    get file() {
        return this.#file;
    }

    constructor(file) {
        this.#file = file;
    }

    async log(string, level, configs) {
        this.#file = await Rolling.rollingCheck(this.#file, configs);

        if (!this.#file.fd) {
            throw Error(`Unexpected Erro: No file descriptor.`);
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
