const fs = require("fs");
const { FOLDER } = require("../config/defaults");

class Folder {
    #f_path;

    get f_path() {
        return this.#f_path;
    }

    static setDefaults(folder) {
        if (!folder) folder = FOLDER;
        return new Folder(folder);
    }

    constructor(folder) {
        this.#f_path = folder;
    }

    static assert(obj) {
        if (arguments.length === 0 || !(obj instanceof Folder)) {
            throw new Error(
                `folder_configs must be an instance of Folder class.
                \nUnsuppoerted param: ${JSON.stringify(obj)}`
            );
        }
        this.#createFolder(obj.f_path);
    }

    static #createFolder(f_path) {
        try {
            // TODO check for other os is work properly
            if (!fs.existsSync(f_path)) {
                fs.mkdirSync(f_path);
            }
            console.info(`LOGLA will writes at ---> ${f_path}`);
        } catch (err) {
            console.error(`Unexpected error while creating folder.\n${err}`);
        }
    }
}

module.exports = { Folder };
