import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccesToken } from '../libs/jwt.js'

// Funcion que registra usuarios
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
            message: "User created successfully",
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funcion que maneja la session
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userFound = await User.findOne({ email })

        if (!userFound) return res.status(400).json({ message: 'User not found' });

        // Esto compara la password ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = await createAccesToken({ id: userFound.id })

        res.cookie('token', token)
        res.json({
            message: "User logged in successfully",
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Funcion que maneja la desconexión 
export const logout = async (req, res) => {
    res.cookie('token',"", {expires: new Date(0)} )
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({message: "User not found"});
    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}