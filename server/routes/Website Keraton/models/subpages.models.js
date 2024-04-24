const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

async function isExist(id) {
    const data = await prisma.pages.findFirst({ id })
    return data != null
}

const getAll = async () => {
    try {
        return await prisma.subPages.findMany()
    } catch (err) {
        throwError(err)
    }
}
