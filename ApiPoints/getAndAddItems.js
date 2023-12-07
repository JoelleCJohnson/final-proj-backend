import { pool } from "../connectDb.js"

export async function getItemsFromWishlist(req, res) {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM list_items')
    const items = result.rows // extract rows from result
    res.status(200).json(items)
}

export async function addItemToWishlist( req, res ) {

    const { name, itemLink, price} = req.body

    await pool.query(`INSERT INTO list_items (itemName, itemLink, itemPrice, isPurchased)
        VALUES ('${name}', '${itemLink}', ${price}, false);`)

    const allItems = await pool.query('SELECT * FROM list_items')
    const items = allItems.rows
    res.status(200).json(items)


}

