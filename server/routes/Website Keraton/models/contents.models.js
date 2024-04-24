const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

async function isExist(id) {
    const data = await prisma.contents.findFirst({ id })
    return !(data === null)
}

const update = async (id, data) => {
    try {
        await isExist(id).then(exist => { if (exist) throw Error('Content ID didnt Exist') })
        const data = await prisma.contents.update({
            where: { id }, data
        })
        return data
    } catch (err) {
        throwError(err)
    }
}

const getAll = async () => {
    try {
        return await prisma.contents.findMany()
    } catch (err) {
        throwError(err)
    }
}

const getOne = async (id) => {
    try {
        return await prisma.contents.findFirst({ where: { id } })
    } catch (err) {
        throwError(err)
    }
}

module.exports = {
    update,
    getOne,
    getAll
}
