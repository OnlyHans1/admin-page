const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

const isExist = async (id) => {
    try{
        return await prisma.purchasable.findFirst({ where: { id } })
    }catch(err){
        throwError(err)
    }
}

const getAll = async (query = { type, subType}) => {
    let { type, subType } = query
    try {
        return await prisma.purchasable.findMany({
            where: {
                subType:{
                    ...(subType != undefined && {id: +subType}),
                    ...(type != undefined && { typeId: +type })
                }
            },
            include: { subType: true }
        })
    } catch (err) {
        throwError(err)
    }
}

const getOne = async (id) => {
    try{
        return await prisma.purchasable.findFirstOrThrow({
            where: { id }
        })
    }catch(err){
        throwError(err)
    }
}

module.exports = { isExist, getOne, getAll }