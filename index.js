import express from "express"
import cors from "cors"
import { getItemsFromWishlist, addItemToWishlist } from "./ApiPoints/phase1.js";

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3001', ]
}))

//phase 1, add and get items from wishlist
app.get('/', getItemsFromWishlist)
app.post('/', addItemToWishlist)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))