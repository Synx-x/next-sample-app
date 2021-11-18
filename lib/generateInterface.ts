const JsonToTS = require("json-to-ts");
const fs = require("fs");

export function generateInterface(queryResult: any, tableName: string) {
  let arrayToString = JSON.stringify(Object.assign({}, queryResult[0]));
  let formatToJson = arrayToString.replace(
    /(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g,
    '$1"$3":'
  );
  let tableInterface = '{"' + "I" + tableName + '":' + formatToJson + "}";
  let stagingInterface: any = null; //fix

  JsonToTS(JSON.parse(tableInterface)).forEach(
    (typeInterface: any, index: number) => {
      typeInterface = "export " + typeInterface;
      fs.readFile("./lib/types.ts", (err: string, data: string) => {
        if (err) throw err;
        if (data.includes(typeInterface)) {
          console.log("found nothing new"); //fix
          stagingInterface += typeInterface; //fix
          console.log("staging: \n\n" + stagingInterface); //fix
        } else {
          // if interface already exists in types file, it will skip creation
          if (index === 1) {
            console.log("\n\nto be added:\n" + typeInterface);
            console.log("\n\nin file:\n" + data);
            //index of 1 skips root object(index of 0) and writes only the interfaces
            const writeStream = fs.createWriteStream("./lib/types.ts", {
              flags: "a", //appends to existing file
            });
            const pathName = writeStream.path;

            fs.appendFile(
              "./lib/types.ts",
              `${typeInterface}\n\n\n`, //fix? messed up somehow
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
      });
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
