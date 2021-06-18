import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        required: [true, 'firstname is missing']
    },
    colors: {
        type: Array,
        required: [false, 'colors is missing']
    }
})

export const teamModel = mongoose.model('Team', teamSchema)
