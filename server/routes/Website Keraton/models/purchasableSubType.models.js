const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

const isExist = async (id) => {
    try{
        return await prisma.purchasableSubType.findFirst({ where: { id } })
    }catch(err){
        throwError(err)
    }
}

const getAll = async () => {
    try {
        return await prisma.purchasableSubType.findMany({
            include: { Purchasable: true }
        })
    } catch (err) {
        throwError(err)
    }
}

const getOne = async (id) => {
    try{
        return await prisma.purchasableSubType.findFirstOrThrow({
            where: { id }, include: { Purchasable: true }
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