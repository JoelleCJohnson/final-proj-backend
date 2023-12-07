import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { pool } from "../connectDb.js"

export async function signup(req, res) {
    const { email, password, firstName, lastName, streetAddress, city, state, zipCode } = req.body 
    if(!email || !password || email.length < 6 || password.length <6){
        res.status(400).send({ message: 'Invalid email or password'})
        return;
    }
    const hashedPw= await bcrypt.hash(password, 10)
    const client = await pool.connect()

    const query = `INSERT INTO users (firstName, lastName, email, password, streetAddress, city, state, zipCode)
    VALUES ('${firstName}', '${lastName}', '${email.toLowerCase()}', '${hashedPw}', '${streetAddress}', '${city}', '${state}', '${zipCode}');`

    await client.query(query)
    login(req,res)
}

export async function login(req, res) {
    const { email, password } = req.body
    const userColl = await pool.query(`SELECT * FROM users WHERE email='${email.toLowerCase()}';`)
    const users = userColl.rows
    const user = users.filter(user => bcrypt.compareSync(password, user.password))[0];
    if(!user){
        res.status(400).send({ message: "Not Authorized"})
        return;
    }
    delete user.password
    const token = jwt.sign(user, process.env.secretKey)
    res.send({ token })
}