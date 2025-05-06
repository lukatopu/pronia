import mongoose from 'mongoose'

const connectDB = (url) => {
    return mongoose.connect(url, {
        dbName: "Pronia"
    })
        .then(() => console.log('connected to mongodb'))
        .catch((err) => console.log('mongodb connection error: ' + err))
}

export default connectDB