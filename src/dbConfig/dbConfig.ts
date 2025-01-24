import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDb connected successfully');
        })
        connection.on('error', (error) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + error);
            process.exit();
        })
    }
    catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
}