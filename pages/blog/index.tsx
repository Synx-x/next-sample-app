import { sql_query } from "../../lib/dbcon";
import { generateInterface, formatQueryToJson } from "../../lib/generateInterface";
import {IPosts} from '../../lib/types'

export async function getStaticProps(context: any) {
  try {
    const result: any = await sql_query(`
          SELECT * FROM posts
          ORDER BY id ASC
      `);

    //generateInterface(result, "Posts");

    //generateInterface(result, "Labels");

    let jsonRes = JSON.parse(JSON.stringify(formatQueryToJson(result, "Posts")));

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
  //console.log(posts);
  if (!posts.posts) {
    return <p>Something went wrong.... {posts.message}</p>;
  } else {
    return (
      <div>
        <h1>Welcome to the blog page.....</h1>
        {
          posts.result_set.map((item: any) => (
            <>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <br />
            </>
          ))
        }
      </div>
    );
  }
}