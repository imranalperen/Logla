const { FOLDER_DEFAULTS } = require("./defaults");
const fs = require("fs");

const folderNameRegex = /^[A-Za-z]+$/;

class Folder {
    #folder;
    #name;

    get folder() {
        return this.#folder;
    }

    get name() {
        return this.#name;
    }

    static setDefaults(config) {
        if (!config) config = {};
        //TODO check other os '/' is works properly ?
        if (!config.folder) config.folder = FOLDER_DEFAULTS.FOLDER;
        if (!config.name) config.name = FOLDER_DEFAULTS.NAME;

        return new Folder(config);
    }

    constructor(folder_configs) {
        this.#folder = folder_configs.folder;
        this.#name = folder_configs.name;
    }

    static assert(folder_configs) {
        if (!arguments || !(folder_configs instanceof Folder)) {
            throw new Error(
                `folder_configs must be an instance of Folder class.
                \nUnsuppoerted param: ${JSON.stringify(folder_configs)}`
            );
        }
        this.#assertFolderName(folder_configs.name);
        const folder_path = this.#createFolder(folder_configs.folder, folder_configs.name);
        return folder_path;
    }

    static #assertFolderName(name) {
        if (!folderNameRegex.test(name)) {
            throw new Error(
                `Invalid folder name ${JSON.stringify(name)}
                \nOnly regex [A-Za-Z] characters are valid.`
            );
        }
    }

    static #createFolder(folder, name) {
        try {
            const folder_path = folder + name;
            if (!fs.existsSync(folder_path)) {
                fs.mkdirSync(folder_path);
            }
            console.info(`LOGLA will writes at ---> ${folder_path}`);
            return folder_path;
        } catch (err) {
            console.error(`Unexpected error while creating folder.\n${err}`);
        }
    }
}

module.exports = { Folder };
