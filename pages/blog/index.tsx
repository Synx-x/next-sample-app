import { sql_query } from "../../lib/dbcon";
import { generateInterface, formatQueryToJson } from "../../lib/generateInterface";
import { IPost } from "../../lib/types";
import pageStyles from "../../styles/pages/Blog.module.scss";
import Link from "next/link";

export async function getStaticProps(context: any) {
  try {
    const result: any = await sql_query(`
          SELECT * FROM posts 
          ORDER BY id ASC
      `);

    //generateInterface(result, "Post");

    // let jsonRes = JSON.parse(
    //   JSON.stringify(formatQueryToJson(result, "Posts"))
    // );

    const resultRes: IPost[] = JSON.parse(JSON.stringify(result));

    return {
      props: { posts: resultRes },
    };
  } catch (e: any) {
    return { props: null };
  }
}

export default function Blog(props: any) {
  const { posts } = props;
  return (
    <>
      <div className={pageStyles.container}>
        <h1>Welcome to the blog page.....</h1>
        {posts.map((item: IPost) => (
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