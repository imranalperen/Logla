const { FILE_DEFAULTS } = require("./defaults");

class File {
    #prefix;
    #date_type;

    get prefix() {
        return this.#prefix;
    }

    get date_type() {
        return this.#date_type;
    }

    static setDefaults(config) {
        if (!config) config = {};
        if (!config.prefix) config.prefix = FILE_DEFAULTS.PREFIX;
        if (!config.date_type) config.date_type = FILE_DEFAULTS.DATE_TYPES.JS_DATE;
        config.date_type = config.date_type.toUpperCase();

        return new File(config);
    }

    constructor(file_configs) {
        this.#prefix = file_configs.prefix;
        this.#date_type = file_configs.date_type;
    }

    static assert(file_configs) {
        if (!arguments || !(file_configs instanceof File)) {
            throw new Error(
                `file_configs must be an instance of File class.
                \nUnsupported param: ${JSON.stringify(file_configs)}`
            );
        }
        this.#assertPrefix(file_configs.prefix);
        this.#assertDateType(file_configs.date_type);
    }

    static #assertPrefix(string) {
        if (string.length > 15) {
            console.warn(
                `File prefix length is ${JSON.stringify(string)}.
                \nThis variable located before all lines. Exp:
                \n[My_Prefix]: .....`
            );
        }
    }

    static #assertDateType(date_type) {
        if (!Object.keys(FILE_DEFAULTS.DATE_TYPES).includes(date_type)) {
            throw new Error(
                `Unsupported date type: ${JSON.stringify(date_type)}
                \nList of supported date types: ${JSON.stringify(FILE_DEFAULTS.DATE_TYPES)}`
            );
        }
    }
}

module.exports = { File };
