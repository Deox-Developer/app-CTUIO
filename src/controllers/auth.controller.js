import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccesToken } from '../libs/jwt.js'


//Funcion que registra usuarios
export const register = async (req, res) => {
    const { email, password, username } = req.body

    try {
        // Esto encripta la password
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        // Guarda los datos recibidos
        const userSaved = await newUser.save();

        const token = await createAccesToken({ id: userSaved.id })

        res.cookie('token', token)
        res.json({
            message: "User created successfuly"
        });
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });

    } catch (error) {
        console.log(error);
    }
};


export const login = (req, res) => res.send('login');