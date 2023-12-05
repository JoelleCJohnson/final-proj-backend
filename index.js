import express from "express"
import cors from "cors"
import { getItemsFromWishlist, addItemToWishlist } from "./ApiPoints/getAndAddItems.js";
import { signup, login } from "./ApiPoints/signupAndLogin.js"
import { updateIsPurchased, deleteListItem } from "./ApiPoints/updateAndDeleteItems.js";
import { isAuthenticated } from "./ApiPoints/middleware.js";

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'https://final-project-630f3.web.app']
}))

//handle preflight OPTIONS reqs for root route
app.options('/', cors()); 


//phase 1, add and get items from wishlist
app.get('/dashboard', isAuthenticated, getItemsFromWishlist)
app.post('/dashboard', isAuthenticated, addItemToWishlist)


//update and delete wishlist items:
app.patch('/dashboard', updateIsPurchased)
app.delete('/dashboard', isAuthenticated, deleteListItem)


//signup and login
app.post('/', signup)
app.post('/login', login)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))