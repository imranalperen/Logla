const { DEFAULT_SIZE, DEFAULT_TIME, MAX_SIZE, MAX_TIME } = require("../config/defaults");

class Rolling {
    #roll_configs = {};

    get rolling_configs() {
        return this.#roll_configs
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
                \nUnsupported param: ${JSON.stringify(rolling_configs)}`
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
}

module.exports = { Rolling };
