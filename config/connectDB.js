// connecting to our MongoDB database from out terminal
import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.Mongo_Data) 
            console.log('connected successfully');
} catch (error) {
    console.log(error); 
}
};

// exporting our MongoDB connection file to our index.js file
export { connectDB }