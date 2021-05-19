import mongoose from "mongoose";

const issueStatusSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'label is missing']
    },
    color: {
        type: String,
        required: [true, 'color is missing']
    },
    closing: {
        type: Boolean,
        required: [true, 'closing is missing']
    }
})

export const issueStatusModel = mongoose.model('IssueStatus', issueStatusSchema)
