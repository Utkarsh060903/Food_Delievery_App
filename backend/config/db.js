import mongoose from 'mongoose'

export const connnectDB = async () => {
    await mongoose.connect('mongodb+srv://utkarsh_2:hello@cluster0.mkoomc9.mongodb.net/?', {
    });
    console.log("DB connected");
}