import mongoose from 'mongoose'

mongoose
    .connect(
        `mongodb+srv://basisplateforme:basisprojet@cluster0.swlgq.mongodb.net/Basis`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    )
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log('Connection to MongoDB failed :', err)
    });