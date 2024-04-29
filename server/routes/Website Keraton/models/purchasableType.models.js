const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

const isExist = async (id) => {
    try {
        return await prisma.purchasableType.findFirst({ where: { id } })
    } catch (err) {
        throwError(err)
    }
}

const nameExist = async (name) => {
    try {
        const nameExist = await prisma.purchasableType.findFirst({ where: { name } })
        return (nameExist != null)
    } catch (err) {
        throwError(err)
    }
}

const getAll = async () => {
    try {
        return await prisma.purchasableType.findMany({
            include: { PurchasableSubType: true }
        })
    } catch (err) {
        throwError(err)
    }
}

const getOne = async (id) => {
    try {
        return await prisma.purchasableType.findFirstOrThrow({
            where: { id }, include: { PurchasableSubType: true }
        })
    } catch (err) {
        throwError(err)
    }
}

const createUpdate = async (ident, data = { name , id}) => {
    try {
        if(ident != 'edit'){
            const alreadyExist = await nameExist(data.name)
            if (alreadyExist) throw Error('Type name already exist')
        }
        return await prisma.purchasableType.upsert({
            where: { name: data.name },
            create: data, update: data
        })
    } catch (err) {
        throwError(err)
    }
}

module.exports = { isExist, getOne, getAll, createUpdate }