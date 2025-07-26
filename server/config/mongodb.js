import mongoose from 'mongoose'

const connectDB = async () => {
    // mongoose.connect(process.env.MONGODB_URI).then(
    //     () => console.log("DB connected successfully...")
    // ).catch(
    //     (err) => console.log(err)
    // )
    try {
        mongoose.connect(process.env.MONGODB_URI)
        return console.log("connected succesfully.........")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;