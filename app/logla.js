const { FileHandler } = require("./lib/file_handler");
const { Rolling } = require("./lib/rolling");
const { Logger } = require("./lib/logger");

class Logla {
    #file_handler;
    #roll_configs;
    #file;
    logger;

    get roll_configs() {
        return this.#roll_configs.rolling_configs;
    }

    get configs() {
        return {
            file_handler_f_path: this.#file_handler.f_path,
            file_handler_prefix: this.#file_handler.prefix,
            roll_configs: this.roll_configs,
            file: this.#file,
            logger: this.logger,
        };
    }

    /**
     * Creates an instance of a configuration object for file handling and rolling settings.
     * @param {object} configs - The configuration object.
     * @param {string} configs.dir_path - The dir path for log files. Example: /home/JohnDoe/Desktop
     * @param {string} configs.file_prefix - The file prefix for '.log' files name. Example: MyPrefix
     * @param {number} configs.roll_size - The roll size as KB.
     * @param {number} configs.roll_time - The roll time as seconds.
     */
    constructor(configs) {
        const dir_path = configs?.dir_path;
        const file_prefix = configs?.file_prefix;
        const roll_size = configs?.roll_size;
        const roll_time = configs?.roll_time;
        this.#file_handler = FileHandler.setDefaults(dir_path, file_prefix);
        FileHandler.assert(this.#file_handler);

        this.#roll_configs = Rolling.setDefaults(roll_size, roll_time);
        Rolling.assert(this.#roll_configs);
    }

    /**
     * Gets latest file with getInitFile. checkRolls and returns a logger.
     * @returns {Logger} An instance of Logger.
     */
    async init() {
        const result = await FileHandler.getInitFile(this.#file_handler);
        this.#file = result.file;
        const file_name = result.file_name;
        this.#file = await Rolling.checkRolls(this.roll_configs, this.#file, file_name, this.#file_handler);

        this.logger = new Logger(this.#file, this.roll_configs, file_name, this.#file_handler);
        return this.logger;
    }
}

module.exports = { Logla };
