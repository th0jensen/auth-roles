const prisma = require('./prisma')
const jwt = require('jsonwebtoken')

function checkRoleUser(role) {
    return async function (req, res, next) {
        const id = parseInt(req.params.id)

        try {
            const authHeader = req.headers.authorization
            if (!authHeader) {
                return res.status(401).json({ error: 'No token provided' })
            }

            const token = authHeader.split(' ')[1]
            if (!token) {
                return res
                    .status(401)
                    .json({ error: 'Malformed token, cannot extract' })
            }

            const { sub: decodedId } = jwt.verify(token, process.env.JWT_SECRET)

            const user = await prisma.user.findUnique({
                where: {
                    id: decodedId,
                },
            })

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            if (user.role !== role) {
                if (user.id === id) {
                    return next()
                }

                return res.status(403).json({
                    error: 'Unauthorized. You do not have the required role',
                })
            }

            next()
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                error: 'An error occurred while processing the request',
            })
        }
    }
}

function checkRolePost(role) {
    return async function (req, res, next) {
        const id = parseInt(req.params.id)

        try {
            const authHeader = req.headers.authorization
            if (!authHeader) {
                return res.status(401).json({ error: 'No token provided' })
            }

            const token = authHeader.split(' ')[1]
            if (!token) {
                return res
                    .status(401)
                    .json({ error: 'Malformed token, cannot extract' })
            }

            const { sub: decodedId } = jwt.verify(token, process.env.JWT_SECRET)

            const user = await prisma.user.findUnique({
                where: {
                    id: decodedId,
                },
            })

            const post = await prisma.post.findUnique({
                where: {
                    id: id,
                },
            })

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            if (!post) {
                return res.status(404).json({ error: 'Post not found' })
            }

            if (user.role !== role) {
                if (user.id === post.userId) {
                    return next()
                }

                return res.status(403).json({
                    error: 'Unauthorized. You do not have the required role',
                })
            }

            next()
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                error: 'An error occurred while processing the request',
            })
        }
    }
}

module.exports = {
    checkRoleUser,
    checkRolePost,
}
