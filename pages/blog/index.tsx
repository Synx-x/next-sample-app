import { sql_query } from "../../lib/dbcon";
import { generateInterface, formatQueryToJson } from "../../lib/generateInterface";
import { IPost } from "../../lib/types";
import pageStyles from "../../styles/pages/Blog.module.scss";
import Link from "next/link";
import { DbQuery } from "../../lib/dbQuery";
import React from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  setTimeout(() => console.log("fetching resources"), 5000);
  generateInterface(data, "fromApi");
  return DbQuery();
};

export default function Blog(props: any) {
  const { posts, statusCode } = props;

  const newStatusCode: string = statusCode;
  const postArr: IPost[] = posts;

  return (
    <>
      {newStatusCode == "200" ? (
        <div className={pageStyles.container}>
          <h1>Welcome to the blog page.....</h1>
          {postArr.map((item: IPost, index: number) => (
            <React.Fragment key={index}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <br />
            </React.Fragment>
          ))}

          <Link href="/">
            <input
              className={pageStyles.button}
              type="button"
              value={"Go to Blog Page"}
            />
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}