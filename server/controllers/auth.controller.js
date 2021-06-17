import {userModel} from "../models/User.model.js";

/**
 * @Route /api/auth/register
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function register(req, res) {
    try {
        const {
            firstname,
            lastname,
            team,
            email,
            password,
            api
        } = req.body

        let isUser = await userModel.find({ email: req.body.email })

        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "email already in use"
            })
        }

        const user = new userModel({
            firstname,
            lastname,
            team,
            email,
            password,
            api
        })

        const data = await user.save();

        const token = await user.generateAuthToken();

        res.status(201).json({data, token});
    } catch (err) {
        console.log(err)
        res.status(400).json({ err: err });
    }
}


/**
 * @Route /api/auth/login
 * @Method POST
 *
 * @param req
 * @param res
 */
export async function login(req, res) {
    try {
        const {
            email,
            password
        } = req.body

        const user = await userModel.findByCredentials(email, password);

        if (!user)
            return res.status(401).json({ error: "Login failed! Check authentication credentials" })

        const token = await user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).send({err});
    }
}

/**
 * @Route /api/auth/update
 * @Method PUT
 *
 * @param req
 * @param res
 */
export async function update(req, res) {
    const {
        firstname,
        lastname,
        team,
        email,
        id,
        password
    } = req.body

    const user = await userModel.findById(id)

    if (firstname && firstname !== user.firstname)
        user.firstname = firstname
    if (lastname && lastname !== user.lastname)
        user.lastname = lastname
    if (team && team !== user.team)
        user.team = team
    if (email && email !== user.email)
        user.email = email
    if (password.length)
        user.password = password

    const data = await user.save()

    const token = await user.generateAuthToken();

    await res.json({ data, token })
}


/**
 * @Route /api/auth/me
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getUser(req, res) {
    const {
        userData
    } = req

    await res.json(userData)
}


/**
 * @Route /api/team/:teamId
 * @Method GET
 *
 * @param req
 * @param res
 */
export async function getTeamUser(req, res) {
    const {
        teamId
    } = req.params

    let team = await userModel.find({ team: teamId })

    await res.json(team)
}

