"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = require("readline");
const v = {
    strNum: 0,
    baseUrl: "https://weatherfactory.biz/skadi-",
};
function sufToUrl(str) {
    return v.baseUrl + str;
}
async function testUrl(url) {
    const ax = axios_1.default.get(url, {
        validateStatus: (_status) => true,
    });
    const worked = (await ax).status !== 404;
    console.log((await ax).status);
    return worked;
}
function transformInput(input) {
    return input.replace(/ /g, "-");
}
function main() {
    const iFace = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    iFace.on("line", (val) => {
        console.log(chalk_1.default.green(sufToUrl(transformInput(val))));
        testUrl(sufToUrl(transformInput(val)))
            .then((worked) => {
            if (worked) {
                console.log(chalk_1.default.greenBright(val));
                process.exit();
            }
        })
            .catch((reason) => {
            console.log(reason);
        });
    });
}
main();
//# sourceMappingURL=index.js.map