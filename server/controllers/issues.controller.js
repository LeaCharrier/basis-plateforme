import {issueStatusModel} from "../models/IssueStatus.model.js"
import {issueModel} from "../models/Issue.model.js"

/**
 * @Route /api/issues/list/:teamId
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getList(req, res) {
    try {
        const {
            teamId
        } = req.params

        const issues = await issueModel.find({ team: teamId })

        res.status(200).send(issues)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/issue/:id
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getById(req, res) {
    try {
        const {
            id
        } = req.params

        const issue = await issueModel.findById(id)

        res.status(200).send(issue)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/issue/create
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function create(req, res) {
    try {
        const {
            content,
            creator,
            assignee,
            status,
            team
        } = req.body

        const issue = new issueModel({
            content,
            creator,
            assignee,
            status,
            team
        })

        const data = await issue.save()

        res.status(201).send(data)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/issue/:id/update
 * @Method PUT
 *
 * @param req
 * @param res
 */
export async function update(req, res) {
    try {
        const {
            content,
            assignee,
            status
        } = req.body

        const {
            id
        } = req.params

        const issue = await issueModel.findById(id)

        if (content && content !== issue.content)
            issue.content = content
        if (assignee && assignee !== issue.assignee)
            issue.assignee = assignee
        if (status && status !== issue.status)
            issue.status = status

        const data = await issue.save()

        res.status(200).send(data)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/status/create
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function createStatus(req, res) {
    try {
        const {
            label,
            color
        } = req.body

        const status = new issueStatusModel({
            label,
            color
        })

        const data = await status.save()

        res.status(201).json(data)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/status/list
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getStatusList(req, res) {
    try {
        const status = await issueStatusModel.find()

        res.status(200).send(status)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/status/:id
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getStatusById(req, res) {
    try {
        const {
            id
        } = req.params

        const status = await issueStatusModel.findById(id)

        res.status(200).send(status)
    } catch (err) {
        res.status(400).send({err})
    }
}

/**
 * @Route /api/issues/status/slug/:slug
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getStatusBySlug(req, res) {
    try {
        const {
            slug
        } = req.params

        const status = await issueStatusModel.find({ slug: slug })

        res.status(200).send(status[0])
    } catch (err) {
        res.status(400).send({err})
    }
}

// 60b09b525558352534834993
