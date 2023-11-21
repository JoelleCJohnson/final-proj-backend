import { pool } from "../connectDb.js"

export async function getItemsFromWishlist(req, res) {
    const result = await pool.query('SELECT * FROM list_items')
    res.status(200).send(result.rows)
}

export async function addItemToWishlist( req, res ) {
    const { name, itemLink, price} = req.body
    const result = await pool.query(`INSERT INTO list_items (itemName, itemLink, itemPrice, isPurchased)
    VALUES ('${name}', '${itemLink}', ${price}, false);`)
    res.status(201).send(result)
}