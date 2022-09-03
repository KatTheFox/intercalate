import axios from "axios";
import chalk from "chalk";
import { createInterface } from "readline";

const v = {
  strNum: 0,
  baseUrl: "https://weatherfactory.biz/skadi-",
};
function sufToUrl(str: string): string {
  return v.baseUrl + str;
}
async function testUrl(url: string): Promise<boolean> {
  const ax = axios.get(url, {
    validateStatus: (_status) => true,
  });
  const worked = (await ax).status !== 404;
  console.log((await ax).status);
  return worked;
}
function transformInput(input: string): string {
  return input.replace(/ /g, "-");
}

function main() {
  const iFace = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
  iFace.on("line", (val) => {
    console.log(chalk.green(sufToUrl(transformInput(val))));
    testUrl(sufToUrl(transformInput(val)))
      .then((worked) => {
        if (worked) {
          console.log(chalk.greenBright(val));
          process.exit();
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  });
}
main();
