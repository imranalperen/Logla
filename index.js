const { Logla } = require("./app/logla");
const path = require("path");

const confs = {
    dir_path: path.join(__dirname, "LOGLA"),
    file_prefix: "DEV_",
    roll_size: 5 * 1024 * 1024,
    roll_time: 24 * 60 * 60,
};

const LOGGER = new Logla(confs);

(async () => {
    const loger = await LOGGER.init();
    loger.log("test");
})();
