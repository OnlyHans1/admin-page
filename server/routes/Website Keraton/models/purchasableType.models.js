const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

const isExist = async (id) => {
    try{
        return await prisma.purchasable.findFirst({ where: { id } })
    }catch(err){
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
    try{
        return await prisma.purchasableType.findFirstOrThrow({
            where: { id }, include: { PurchasableSubType: true }
        })
    }catch(err){
        throwError(err)
    }
}

const create = async (id) => {
    try{
        
    }catch(err){
        throwError(err)
    }
}

module.exports = { isExist, getOne, getAll }