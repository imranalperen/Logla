const path = require("path");

module.exports.YYYY_MM_DD = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formatted_date = `${year}-${month}-${day}`;
    return formatted_date;
};

module.exports.logDateFormat = () => {
    const current_date = new Date();
    const year = current_date.getFullYear();
    const month = String(current_date.getMonth() + 1).padStart(2, "0");
    const day = String(current_date.getDate()).padStart(2, "0");
    const hours = current_date.getHours();
    const minutes = current_date.getMinutes();
    const seconds = current_date.getSeconds();
    const ms = current_date.getMilliseconds();

    return `${year}|${month}|${day}|${hours}:${minutes}:${seconds}:${ms}`;
};

module.exports.setFilePath = (prefix, folder, name) => {
    // TODO fix the bug
    // const file_name = "/" + prefix + this.YYYY_MM_DD() + ".log";
    const file_name = "/" + prefix + this.logDateFormat() + ".log";
    const f_path = path.resolve(folder + name + file_name);
    return f_path;
};
