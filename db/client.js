import mongoose from 'mongoose';


export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('Database connection is successful');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection failed',error);
        process.exit(1);
    }
}