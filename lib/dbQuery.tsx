import React, { useState } from "react";
import { sql_query } from "./dbcon";
import { generateInterface } from "./generateInterface";
import { IPost } from "./types";

export const DbQuery = async () => {
  try {
    const result: any = await sql_query(`
              SELECT * FROM posts 
              ORDER BY id ASC
          `);

    //generateInterface(result, "Post");
    //generateInterface(result, "Labels");
    // let jsonRes = JSON.parse(
    //   JSON.stringify(formatQueryToJson(result, "Posts"))
    // );

    const posts: IPost[] = JSON.parse(JSON.stringify(result));
    //throw new Error("Failed");

    return {
      props: { statusCode: "200", posts },
    };
  } catch (e: any) {
    return { props: { statusCode: "400", result: e.message } };
  }
};
