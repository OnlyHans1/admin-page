const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

async function isExist(id) {
    const data = await prisma.pages.findFirst({ id })
    return data != null
}

const getAll = async () => {
    try {
        const data = await prisma.pages.findMany()
        return data
    } catch (err) {
        throwError(err)
    }
}

const getOne = async (id) => {
    try {
        await isExist(id).then(exist => { if (!exist) throw Error('Content ID didnt Exist') })
        return await prisma.pages.findFirst({ where: { id } })
    } catch (err) {
        throwError(err)
    }
}

const getAllSubPages = async (id) => {
    try {
        await isExist(id).then(exist => { if (!exist) throw Error('Content ID didnt Exist') })
        const subPages = await prisma.pages.findMany({ where: { id }, select: { name: true, SubPages: true } })
        return subPages
    } catch (err) {

    throwError(err)
    }
}

module.exports = {
    getAll,
    getOne,
    getAllSubPages
}