const fs = require("fs/promises");

const { Folder } = require("./folder");
const { File } = require("./file");
const { Rolling } = require("./rolling");
const { Logger } = require("./logger");

const { setFilePath } = require("./utils");

class Logla {
    #folder_configs;
    #file_configs;
    #rolling_configs;
    logger;

    get configs() {
        return {
            folder_configs: {
                folder: this.#folder_configs.folder,
                name: this.#folder_configs.name,
            },
            file_configs: {
                prefix: this.#file_configs.prefix,
            },
            rolling_configs: {
                size: this.#rolling_configs.size,
                time: this.#rolling_configs.time,
            },
        };
    }

    constructor(folder_configs, file_configs, rolling_configs) {
        this.#folder_configs = Folder.setDefaults(folder_configs);
        Folder.assert(this.#folder_configs);

        this.#file_configs = File.setDefaults(file_configs);
        File.assert(this.#file_configs);

        this.#rolling_configs = Rolling.setDefaults(rolling_configs);
        Rolling.assert(this.#rolling_configs);
    }

    async init() {
        const f_path = setFilePath(this.#file_configs.prefix, this.#folder_configs.folder, this.#folder_configs.name);
        let file = await fs.open(f_path, "a+");

        file = await Rolling.rollingCheck(file, this.configs);

        this.logger = new Logger(file);
    }

    async log(string, level) {
        this.logger.log(string, level, this.configs);
    }
}

const LOGGER = new Logla(
    (folder_configs = {
        // folder: "/home/alperen/Desktop/",
        name: "LOGLA",
    }),
    (file_configs = {
        prefix: "LOGLA_",
    }),
    (rolling_configs = {
        size: 5 * 1024 * 1024, // as KB
        time: 1 * 24 * 60 * 60, // as seconds
    })
);

(async () => {
    await LOGGER.init();
})();

setTimeout(() => {
    LOGGER.log("hello world");
}, 100);
