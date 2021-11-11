import { sql_query } from "../../lib/dbcon";

const handler = async (_:any, res:any) => {
  try {
    const results = await sql_query(`
      SELECT * FROM posts
      ORDER BY title DESC
      LIMIT 10
  `);
    return res.json(results);
  } catch (e:any) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;