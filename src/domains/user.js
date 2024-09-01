const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password) =>
    await prisma.user.create({
        data: {
            username,
            passwordHash: await bcrypt.hash(password, 6),
        },
    })

const deleteUserDb = async (id) =>
    await prisma.user.delete({
        where: {
            id: id,
        },
    })

const getUsersDb = async () => await prisma.user.findMany()

module.exports = {
    createUserDb,
    deleteUserDb,
    getUsersDb,
}
