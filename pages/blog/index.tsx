import { sql_query } from "../../lib/dbcon";
import { generateInterface, formatQueryToJson } from "../../lib/generateInterface";
import {IPosts} from '../../lib/types'
import * as pageStyles from "../../styles/pages/Blog.module.scss";
import Link from "next/link";

export async function getStaticProps(context: any) {
  try {
    const result: any = await sql_query(`
          SELECT * FROM posts
          ORDER BY id ASC
      `);

    //generateInterface(result, "Posts");

    //generateInterface(result, "Labels");

    let jsonRes = JSON.parse(
      JSON.stringify(formatQueryToJson(result, "Posts"))
    );

    const resultRes: IPosts = jsonRes;

    console.log(resultRes);

    const result_set = {
      posts: true,
      result_set: JSON.parse(JSON.stringify(result)),
    };
    return {
      props: { posts: result_set },
    };
  } catch (e: any) {
    const result_set = {
      posts: false,
      message: e.message,
    };
    return { props: { posts: result_set } };
  }
}

export default function Blog(props: any) {
  const { posts } = props;

  if (!posts.posts) {
    return <p>Something went wrong.... {posts.message}</p>;
  } else {
    return (
      <>
        <div className={pageStyles.container}>
          <h1>Welcome to the blog page.....</h1>
          {posts.result_set.map((item: any) => (
            <>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <br />
            </>
          ))}

          <Link href="/">
            <input
              className={pageStyles.button}
              type="button"
              value={"Go to Blog Page"}
            />
          </Link>
        </div>
      </>
    );
  }
}