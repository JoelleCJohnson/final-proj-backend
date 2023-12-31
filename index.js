import express from "express"
import cors from "cors"
import { getItemsFromWishlist, addItemToWishlist } from "./ApiPoints/getAndAddItems.js";
import { signup, login } from "./ApiPoints/signupAndLogin.js"
import { updateIsPurchased, deleteListItem } from "./ApiPoints/updateAndDeleteItems.js";
import { isAuthenticated } from "./ApiPoints/middleware.js";
import { getFriendsInformation, getFriendsWishlist } from "./ApiPoints/sharedLists.js";


const PORT = process.env.PORT || 3000
const app = express();

app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002', 'https://final-project-630f3.web.app', 'https://final-project-630f3.web.app']
}))
app.use(express.json())


//handle preflight OPTIONS reqs (handle CORS errors)
app.options('/', cors())
app.options('/dashboard', cors())

//add and get items from your own wishlist
app.get('/dashboard', isAuthenticated, getItemsFromWishlist)
app.post('/dashboard', isAuthenticated, addItemToWishlist)


//update and delete wishlist items:
app.patch('/dashboard/:userid/:listid', updateIsPurchased)
app.delete('/dashboard/:listid', isAuthenticated, deleteListItem)


//signup and login
app.post('/', signup)
app.post('/login', login)

//accessing friends wishlists
app.get('/share/:userid', getFriendsWishlist)
app.get('/info/:userid', getFriendsInformation)

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))