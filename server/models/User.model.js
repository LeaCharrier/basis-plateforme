import mongoose from "mongoose";
import bcrypt  from "bcryptjs";
import jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Include your name']
    },
    email: {
        type: String,
        required: [true, 'Please Include your email']
    },
    password: {
        type: String,
        required: [true, 'Please Include your password']
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, 'secret')

    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await userModel.findOne({ email })

    if (!user)
        throw new Error({ error: 'Invalid login details' })

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch)
        throw new Error({ error: 'Invalid login details' })

    return user
}

export const userModel = mongoose.model('User', userSchema)
