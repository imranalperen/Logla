const { Folder } = require("./folder");
const { File } = require("./file");
const { Rolling } = require("./rolling");

class Logla {
    #folder_configs;
    #file_configs;
    #rolling_configs;

    constructor(folder_configs, file_configs, rolling_configs) {
        this.#folder_configs = Folder.setDefaults(folder_configs);
        Folder.assert(this.#folder_configs);

        this.#file_configs = File.setDefaults(file_configs);
        File.assert(this.#file_configs);

        this.#rolling_configs = Rolling.setDefaults(rolling_configs);
        Rolling.assert(this.#rolling_configs);
    }

    get configs() {
        const configs = {
            folder_configs: {
                folder: this.#folder_configs.folder,
                name: this.#folder_configs.name,
            },
            file_configs: {
                prefix: this.#file_configs.prefix,
                date_type: this.#file_configs.date_type,
            },
            rolling_configs: {
                size: this.#rolling_configs.size,
                time: this.#rolling_configs.time,
            },
        };
        return configs;
    }
}

const TESTLOGLA = new Logla(
    (folder_configs = {
        folder: "/Users/imranalperenbayram/code/logla/",
        name: "TESTLOGLA",
    }),
    (file_configs = {
        prefix: "LOGLA_V:0.1_: ",
        date_type: "js_date", //unix or jsdate
    }),
    (rolling_configs = {
        size: 5 * 1024 * 1024, // as KB
        time: 1 * 24 * 60 * 60, // as seconds
    })
);

console.log(TESTLOGLA.configs);
