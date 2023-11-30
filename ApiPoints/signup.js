import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function signup(req, res) {
    const { email, password } = req.body 
    if(!email || !password || email.length < 6 || password.length <6){
        res.status(400).send({ message: 'Invalid email or password'})
        return
    }
    const hashedPw= await bcrypt.hash(password, 10)
    await
}