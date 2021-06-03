import mongoose from "mongoose";
import slugify from "slugify";

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
    },
    project: {
        type: String,
        required: [true, 'team is missing']
    }
},{
    timestamps: true
})

issueSchema.pre('save', async function(next) {
    const issue = this

    this.updated_at = Date.now()

    next()
})

export const issueModel = mongoose.model('Issue', issueSchema)
