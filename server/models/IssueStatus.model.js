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
    },
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue',
            required: true
        }
    ]
})

export const issueStatusModel = mongoose.model('IssueStatus', issueStatusSchema)
