import jwt from "jsonwebtoken"

/**
 * @Middleware Auth
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export default function (req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");

        req.userData = jwt.verify(token, "secret");

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Authentification Failed"
        });
    }
}
