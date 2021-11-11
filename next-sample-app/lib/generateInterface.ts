const JsonToTS = require("json-to-ts");
const fs = require("fs");

export function generateInterface(queryResult: any, tableName: string) {
  let arrayToString = JSON.stringify(Object.assign({}, queryResult[0]));
  let formatToJson = arrayToString.replace(
    /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g,
    '$1"$3":'
  );
  var tableInterface = '{"' + "I" + tableName + '":' + formatToJson + "}";

  JsonToTS(JSON.parse(tableInterface)).forEach(
    (typeInterface: any, index: number) => {
      if (index == 1) {
        const writeStream = fs.createWriteStream("./lib/types.ts");
        const pathName = writeStream.path;

        fs.appendFile(
          "./lib/types.ts",
          `${"export " + typeInterface}\n\n`,
          (err: string) => {
            if (err) {
              console.log(err);
            }
          }
        );

        writeStream.on("finish", () => {
          console.log(`Interface added to: ${pathName}`);
        });

        writeStream.on("error", (err: string) => {
          console.error(
            `There is an error writing the file ${pathName} => ${err}`
          );
        });
        writeStream.end();
      }
    }
  );
}

export function formatQueryToJson(queryResult: any, tableName: string) {
  let jsonBuilder = "{ ";
  let length = queryResult.length;

  for (let i = 0; i < length; i++) {
    let arrayToString = JSON.stringify(Object.assign({}, queryResult[i]));

    let formatToJson = arrayToString.replace(
      /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g,
      '$1"$3":'
    );
    let tableInterface =
      '"' +
      tableName +
      queryResult[i].id +
      '":' +
      formatToJson +
      (i < length - 1 ? "," : "");
    jsonBuilder += tableInterface;
  }

  jsonBuilder += " }";

  return jsonBuilder
}
