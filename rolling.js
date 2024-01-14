const { SIZE_DEFAULTS, TIME_DEFAULTS } = require("./defaults");

class Rolling {
    #size;
    #time;

    get size() {
        return this.#size;
    }

    get time() {
        return this.#time;
    }

    static setDefaults(config) {
        if (!config) config = {};
        if (!config.size) config.size = SIZE_DEFAULTS.Five_MB;
        if (!config.time) config.time = TIME_DEFAULTS.Daily;

        return new Rolling(config);
    }

    constructor(rolling_configs) {
        this.#size = rolling_configs.size;
        this.#time = rolling_configs.time;
    }

    static assert(rolling_configs) {
        if (!arguments || !(rolling_configs instanceof Rolling)) {
            throw new Error(
                `rolling_configs must be an instance of Rolling class.
                \nUnsupported param: ${JSON.stringify(rolling_configs)}`
            );
        }
        this.#assertSize(rolling_configs.size);
        this.#assertTime(rolling_configs.time);
    }

    static #assertSize(size) {
        if (size > SIZE_DEFAULTS.Twenty_MB) {
            throw new Error(
                `rolling_configs size can't be bigger then 20 MB (${SIZE_DEFAULTS.Twenty_KB} as KB).
                \nYour file size ${size}`
            );
        }
    }

    static #assertTime(time) {
        if (time > TIME_DEFAULTS.Weekly) {
            throw new Error(
                `rolling_configs time can't be bigger than 1 week (${TIME_DEFAULTS.Weekly} as seconds)
                \nYour time is ${time}`
            );
        }
    }
}

module.exports = { Rolling };
