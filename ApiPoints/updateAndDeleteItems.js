import { pool } from '../connectDb.js'
import { getItemsFromWishlist } from './getAndAddItems.js'
import { getFriendsWishlist } from './sharedLists.js'

export async function updateIsPurchased(req, res) { // add isUser middleware
    const listid = req.params.listid
    const updatedItem = await pool.query(`UPDATE list_items
        SET ispurchased = true
        WHERE listid = ${listid};`)
        getFriendsWishlist(req, res)
}

export async function deleteListItem(req, res) { //add isUser middleware
    const listid = req.params.listid
    await pool.query(`DELETE FROM list_items
    WHERE listid = ${listid};`)
    getItemsFromWishlist(req, res)
}