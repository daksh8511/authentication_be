import mongoose from 'mongoose'

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Successfully connected Database')
    } catch (error) {
        console.error("Failed to connect Database")
    }
}

export default ConnectDB;