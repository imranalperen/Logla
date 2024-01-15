const { FILE_DEFAULTS } = require("./defaults");

class File {
    #prefix;

    get prefix() {
        return this.#prefix;
    }

    static setDefaults(config) {
        if (!config) config = {};
        if (!config.prefix) config.prefix = FILE_DEFAULTS.PREFIX;

        return new File(config);
    }

    constructor(file_configs) {
        this.#prefix = file_configs.prefix;
    }

    static assert(file_configs) {
        if (!arguments || !(file_configs instanceof File)) {
            throw new Error(
                `file_configs must be an instance of File class.
                \nUnsupported param: ${JSON.stringify(file_configs)}`
            );
        }
        this.#assertPrefix(file_configs.prefix);
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
}

module.exports = { File };
