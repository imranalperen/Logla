const { DEFAULT_SIZE, DEFAULT_TIME, MAX_SIZE, MAX_TIME } = require("../config/defaults");
const { FileHandler } = require("./file_handler");

class Rolling {
    #roll_configs = {};

    get rolling_configs() {
        return this.#roll_configs;
    }

    static setDefaults(size, time) {
        if (!size) size = DEFAULT_SIZE;
        if (!time) time = DEFAULT_TIME;

        return new Rolling(time, size);
    }

    constructor(time, size) {
        this.#roll_configs.time = time;
        this.#roll_configs.size = size;
    }

    static assert(obj) {
        if (arguments.length === 0 || !(obj instanceof Rolling)) {
            throw new Error(
                `rolling_configs must be an instance of Rolling class.
                \nUnsupported param: ${JSON.stringify(obj)}`
            );
        }
        this.#assertSize(obj.size);
        this.#assertTime(obj.time);
    }

    static #assertSize(size) {
        if (size > MAX_SIZE || size <= 0) {
            throw new Error(`Max rolling size is ${MAX_SIZE}. Your file size ${size}`);
        }
    }

    static #assertTime(time) {
        if (time > MAX_TIME || time <= 0) {
            throw new Error(`Max rolling time is ${MAX_TIME}. Your time is ${time}`);
        }
    }

    /**
     *
     * @param {obj} rolling_configs A rolling_configs object which includes 'time' and 'size'.
     * @param {File} file A file descriptor which opened from FileHandler.getInitFile() or FileHandler.getFile().
     * @param {string} file_name Name of working file.
     * @param {file_handler} file_handler an instance of FileHandler class.
     * @returns {File} A file descriptor.
     */
    static async checkRolls(rolling_configs, file, file_name, file_handler) {
        const stats = await file.stat();
        const current_time = new Date().getTime();
        let new_file = file;
        if (stats.size >= rolling_configs.size || current_time - stats.birthtimeMs >= rolling_configs.time * 1000) {
            await file.close();
            const file_number = Number(file_name.match(/#(.*?)\./)[1]) + 1; // split # to .
            const result = await FileHandler.getFile(file_handler, file_number);
            new_file = result.file;
        }
        return new_file;
    }
}

module.exports = { Rolling };
