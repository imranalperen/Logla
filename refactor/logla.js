const { Folder } = require("./lib/folder");
const { File } = require("./lib/file");
const { Rolling } = require("./lib/rolling");

class Logla {
    #folder_path;
    #file_prefix;
    #roll_configs;

    get folder_path() {
        return this.#folder_path.f_path;
    }

    get file_prefix() {
        return this.#file_prefix.prefix;
    }

    get roll_configs() {
        return this.#roll_configs.rolling_configs;
    }

    get configs() {
        return {
            folder_path: this.folder_path,
            file_prefix: this.file_prefix,
            roll_configs: this.roll_configs,
        };
    }

    constructor(folder_path, file_prefix, roll_size, roll_time) {
        this.#folder_path = Folder.setDefaults(folder_path);
        Folder.assert(this.#folder_path);

        this.#file_prefix = File.setDefaults(file_prefix);
        File.assert(this.#file_prefix);

        this.#roll_configs = Rolling.setDefaults(roll_size, roll_time);
        Rolling.assert(this.#roll_configs);
    }
}

const LOGGER = new Logla();
console.log(LOGGER.configs);
