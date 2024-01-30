const { YYYY_MM_DD } = require("../utils/date_formatters");
const { PREFIX, DIRECTORY } = require("../config/defaults");
const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = require("fs");

class FileHandler {
    #prefix;
    #f_path;

    get f_path() {
        return this.#f_path;
    }

    get prefix() {
        return this.#prefix;
    }

    static setDefaults(f_path, prefix) {
        if (!f_path) f_path = DIRECTORY;
        if (!prefix) prefix = PREFIX;

        return new FileHandler(f_path, prefix);
    }

    constructor(f_path, prefix) {
        this.#prefix = prefix;
        this.#f_path = f_path;
    }

    static assert(obj) {
        if (arguments.length === 0 || !(obj instanceof FileHandler)) {
            throw new Error(
                `file_handler must be an instance of FileHandler class.
                \nUnsupported param: ${JSON.stringify(obj)}`
            );
        }
        this.#assertPrefix(obj.prefix);
        this.#makeDir(obj.f_path);
    }

    static #assertPrefix(string) {
        if (string.indexOf("#") !== -1) {
            throw new Error("Logla doesn't support hash character ('#') at file prefixes'.");
        }
        if (string.length > 15) {
            console.warn(
                `WARN: File prefix too long: ${JSON.stringify(string)}.
                \nThis is a file name prefix. Exp:
                \nMYPREFIX_2024-01-16-file#0.log`
            );
        }
    }

    static #makeDir(f_path) {
        try {
            // TODO check for other os is work properly
            if (!fs.existsSync(f_path)) {
                fs.mkdirSync(f_path, { recursive: true });
            }
            console.info(`LOGLA will writes at ---> ${f_path}`);
        } catch (err) {
            console.error(`Unexpected error while creating directory.\n${err}`);
        }
    }

    /**
     * Useing at Logla.init() to prevent same day multiple files conflict.
     * it selects latest file and return it as opened. if there is no file create new one (actually first one).
     * @param {object} file_handler an instance of FileHandler class
     * @returns {Promise<{file_name: string, file: fs.promises.FileHandle}>}
     */
    static async getInitFile(file_handler) {
        const files = fs.readdirSync(file_handler.f_path);
        if (files.length > 0) {
            const file_name = files.sort().slice(-1);
            const f_path = path.resolve(file_handler.f_path + "/" + file_name);
            return {
                file_name: file_name[0],
                file: await fsPromises.open(f_path, "a+"),
            };
        } else {
            return await FileHandler.getFile(file_handler);
        }
    }

    /**
     * Create a file name (Example: LOGLA_2024-01-16-file#0.log), open the file (if not creted creates)
     * @param {file_handler} file_handler an instance of FileHandler class.
     * @param {number} file_number
     * @returns {Promise<{file_name: string, file: fs.promises.FileHandle}>}
     */
    static async getFile(file_handler, file_number = 0) {
        const file_name = "/" + file_handler.prefix + YYYY_MM_DD() + `-file#${file_number}` + ".log";
        const f_path = path.resolve(file_handler.f_path + file_name);
        return {
            file_name: file_name,
            file: await fsPromises.open(f_path, "a+"),
        };
    }
}

module.exports = { FileHandler };
