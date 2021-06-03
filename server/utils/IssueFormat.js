import {userModel} from "../models/User.model.js"
import {issueStatusModel} from "../models/IssueStatus.model.js"

export async function issueFormat(issue) {
    const res = {
        id: issue._id,
        content: issue.content,
    }

    res.assignee = await userModel.findById(issue.assignee)
    res.creator = await userModel.findById(issue.creator)
    res.status = await issueStatusModel.findById(issue.status)

    return res
}
