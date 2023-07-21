import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

// Crea token y cookie
export function createAccesToken(payload){
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        );
    })
}