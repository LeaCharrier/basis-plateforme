import mongoose from "mongoose";
import bcrypt  from "bcryptjs";
import jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'firstname is missing']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is missing']
    },
    email: {
        type: String,
        required: [true, 'email is missing']
    },
    password: {
        type: String,
        required: [true, 'password is missing']
    },
    team: {
        type: String,
        required: [true, 'team is missing']
    },
    api: {
        type: String,
        required: [true, 'api is missing']
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

    const {
        firstname,
        lastname,
        team,
        email,
        password,
        api
    } = user

    const token = jwt.sign({
        _id: user._id,
        firstname,
        lastname,
        team,
        email,
        password,
        api
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
