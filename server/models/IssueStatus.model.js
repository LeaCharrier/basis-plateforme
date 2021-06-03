import mongoose from "mongoose";
import slugify from "slugify";

const issueStatusSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'label is missing']
    },
    slug: {
        type: String,
        required: [false]
    },
    color: {
        type: String,
        required: [true, 'color is missing']
    }
})

issueStatusSchema.pre('save', async function(next) {
    const status = this

    status.slug = slugify(status.label.toLowerCase())

    next()
})

export const issueStatusModel = mongoose.model('IssueStatus', issueStatusSchema)
