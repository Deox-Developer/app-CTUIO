import mongoose from 'mongoose'

export const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/appCMR');
        console.log('La base de datos se conectó con exito')
    } catch (error) {
        console.log('Ups! Se encotró el siguiente error:',error);
    }
}