import jwt from 'jsonwebtoken'

export async function isAuthenticated(req, res, next) {
    const key = process.env.secretKey
    const { authorization } = req.headers
    if(!authorization){
        res.status(401).send({ message: 'No authorization token found' })
        return
    }
    jwt.verify(authorization, key, (err, decoded) => {
        if(err){
            res.status(401).send(err)
            return
        }
        req.locals = decoded

        next(req, res)
    })
}