import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('DB connected successfully');
        })
        .catch((err) => {
            console.error('DB connection failed:', err);
        });
};

export default dbconnection;
