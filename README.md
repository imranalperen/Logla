Learning purpose logging library based on fs, fs/promises modules.

## Dependencies
- `Node: v20.10.0`

## Using Example

```js
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
```
### Output

```
PROJECT_PATH/LOGLA/DEV_2024-01-20-file#0.log

[2024|01|20|17:26:1:689] [DEBUG]: test

```

#### Default Values
- `dir_path` ==> `PROJECT_PATH/app/LOGLA`
- `file_prefix` ==> `LOGLA_`
- `roll_size` ==> `5 * 1024 * 1024` 5 MB as KB
- `roll_time` ==> `24 * 60 * 60` 1 day as seconds

#### Doc
- When you create a new instance of Logla:
  - Checks your variables validity and creates necessary instances from `FileHandler` and `Rolling` classes.
- When you run `init()` method:
  - First runs `FileHandler` class `getInitFile()`. It checks your last created log file. If there is not create a file with `getFile()` method.
    - `getFile()` method generates a file name, open the `file` (file descriptor) (with `a+`), close old one, and return it with `file_name`.
  - Then `Rolling` class `checkRolls()` method checks `file` validity. If `size` or `time` is not valid, creates a new `file` (file descriptor) and return it.
  - Lastly creates a new `Logger` instance with `file` and return it.
- When `loger.log('test', 'info')` runs:
  - You call `Logger.log()` method.
  - This method firstly runs `checkRolls()` which we talked. 
  - Validation checks and wirtes log the file.

- Logla uses fs/promises to write logs means doesn't block event loop, but while app standing up uses fs module one time to check Log files.
