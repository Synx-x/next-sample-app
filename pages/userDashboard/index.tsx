import { db, sql_query } from "../../lib/dbcon";
import { generateInterface } from "../../lib/generateInterface";
import { Iusers } from "../../lib/types";

export async function getStaticProps(context: any) {
  try {
    const result: any = await sql_query(`
    SELECT employee_id, name, surname FROM employees ORDER BY employee_id ASC
        `);

    generateInterface(result, "user");

    //generateInterface(result, "Labels");

    let users: Iusers;

    return {
      props: { users: JSON.parse(JSON.stringify(result)) },
    };
  } catch (e: any) {
    const result_set = {
      posts: false,
      message: e.message,
    };
    return { props: { posts: result_set } };
  }
}

export default function userDashboard(props: any) {
  console.log(props);
  return (
    <div>
      {props.users.map((item: any) => (
        <>
          <h2>{item.name}</h2>
          <p>{item.surname}</p>
          <br />
        </>
      ))}
    </div>
  );
}
