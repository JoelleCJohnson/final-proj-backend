import { pool } from "../connectDb.js";
import { getItemsFromWishlist } from "./phase1.js";

export async function updateIsPurchased(req, res) { // add isUser middleware
    const listid = req.body.id
    const updatedItem = await pool.query(`UPDATE list_items
        SET ispurchased = true
        WHERE listid = ${listid};`)
    getItemsFromWishlist(req, res)
}

export async function deleteListItem(req, res) { //add isUser middleware
    const listid = req.body.id
    const deleteItem = await pool.query(`DELETE FROM list_items
    WHERE listid = ${listid};`)
    getItemsFromWishlist(req, res)
}