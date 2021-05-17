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
            password
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
            password
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

