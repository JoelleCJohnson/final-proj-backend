import { pool } from "../connectDb.js"

export async function getItemsFromWishlist(req, res) {
    const client = await pool.connect()
    const { userid } = req.locals
    const result = await client.query(`SELECT * FROM list_items
    WHERE userid = '${userid}';`)
    const items = result.rows // extract rows from result
    res.status(200).json(items)
}

export async function addItemToWishlist( req, res ) {

    const { name, itemLink, price} = req.body
    const { userid } = req.locals
    console.log('userid = ', userid)
    await pool.query(`INSERT INTO list_items (itemName, itemLink, itemPrice, isPurchased, userid)
        VALUES ('${name}', '${itemLink}', ${price}, false, '${userid}');`)

    // const allItems = await pool.query('SELECT * FROM list_items')
    // const items = allItems.rows

    getItemsFromWishlist(req,res)
}

