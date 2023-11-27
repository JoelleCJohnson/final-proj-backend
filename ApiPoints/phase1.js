import { pool } from "../connectDb.js"

export async function getItemsFromWishlist(req, res) {
    const result = await pool.query('SELECT * FROM list_items')
    res.status(200).send(result)
}

export async function addItemToWishlist( req, res ) {

    const { name, itemLink, price} = req.body

    await pool.query(`INSERT INTO list_items (itemName, itemLink, itemPrice, isPurchased)
        VALUES ('${name}', '${itemLink}', ${price}, false);`)

    const allItems = await pool.query('SELECT * FROM list_items')
    res.send(allItems.rows)//sends as an array

}

// will need app.patch to set items as purchased