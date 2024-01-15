const { PREFIX } = require("../config/defaults");

class File {
    #prefix;

    get prefix() {
        return this.#prefix;
    }

    static setDefaults(prefix) {
        if (!prefix) prefix = PREFIX;

        return new File(prefix);
    }

    constructor(prefix) {
        this.#prefix = prefix;
    }

    static assert(obj) {
        if (arguments.length === 0 || !(obj instanceof File)) {
            throw new Error(
                `file_configs must be an instance of File class.
                \nUnsupported param: ${JSON.stringify(obj)}`
            );
        }
        this.#assertPrefix(obj.prefix);
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
