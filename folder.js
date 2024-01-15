const fs = require("fs");

const { FOLDER_DEFAULTS } = require("./defaults");

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
        this.#createFolder(folder_configs.folder, folder_configs.name);
    }

    static #assertFolderName(name) {
        const folderNameRegex = /^[A-Za-z]+$/;
        if (!folderNameRegex.test(name)) {
            throw new Error(
                `Invalid folder name ${JSON.stringify(name)}
                \nOnly regex [A-Za-Z] characters are valid.`
            );
        }
    }

    static #createFolder(folder, name) {
        try {
            const f_path = folder + name;
            /**
             * TODO check for other os is work properly
             * Using fs instead fs/promises.
             * This func only runs at app stands up and/or setted time period.
             * Means doesn't use regularly.
             * For more readable code with negligible performance loss.
             */
            if (!fs.existsSync(f_path)) {
                fs.mkdirSync(f_path);
            }
            console.info(`LOGLA will writes at ---> ${f_path}/`);
        } catch (err) {
            console.error(`Unexpected error while creating folder.\n${err}`);
        }
    }
}

module.exports = { Folder };
