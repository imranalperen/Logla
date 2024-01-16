const { Logla } = require("./app/logla");

const confs = {
    dir_path: "/home/alperen/code/Logla/LOGTEST",
    file_prefix: "My_Prefix",
    roll_size: 5 * 1024 * 1024,
    roll_time: 24 * 60 * 60,
};

const LOGGER = new Logla(confs);

(async () => {
    const loger = await LOGGER.init();
    loger.log("test");
})();
