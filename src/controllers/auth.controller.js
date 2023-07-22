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
        res.status(500).json({message: error.message})
    }
};


//Funcion que registra usuarios
export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound =await User.findOne({email})

        if (!userFound) return res.status(400).json({message: 'User no found'});

        // Esto desencripta la password
        const isMatch  = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({message: 'Incorrect password '});

        // Guarda los datos recibidos
        const userSaved = await newUser.save();

        const token = await createAccesToken({ id: userFound.id })

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
        res.status(500).json({message: error.message})
    }
};