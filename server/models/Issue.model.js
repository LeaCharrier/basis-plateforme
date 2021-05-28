import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'content is missing']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is missing']
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is missing']
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IssueStatus',
        required: [true, 'status is missing']
    },
    team: {
        type: String,
        required: [true, 'team is missing']
    }
})

export const issueModel = mongoose.model('Issue', issueSchema)
