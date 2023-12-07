import { pool } from "../connectDb.js"

export async function getFriendsWishlist(req, res) {
    const client = await pool.connect()
    const userid = req.params.userid
    console.log(userid)
    const result = await client.query(`SELECT * FROM list_items
    WHERE userid = '${userid}';`)
    const items = result.rows
    res.status(200).send(items)
}