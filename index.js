import express from "express"
import cors from "cors"
import { getItemsFromWishlist, addItemToWishlist } from "./ApiPoints/phase1.js";
import { signup, login } from "./ApiPoints/signup.js"

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000']
}))

//handle preflight OPTIONS reqs for root route
app.options('/', cors()); 

//phase 1, add and get items from wishlist
app.get('/', getItemsFromWishlist)
app.post('/', addItemToWishlist)

app.post('/signup', signup)
app.post('/login', login)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))