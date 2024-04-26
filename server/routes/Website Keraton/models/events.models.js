const { throwError } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

const isExist = async (id) => {
    try{
        return await prisma.events.findFirst({ where: { id } })
    }catch(err){
        throwError(err)
    }
}

const getAll = async (query) => {
    let { iterat, free } = query
    try {
        return await prisma.events.findMany({
            where: {
                ...(iterat != undefined && { iteration: iterat }),
                ...(free != undefined && { isFree: (free != "0") })
            }
        })
    } catch (err) {
        throwError(err)
    }
}

const getOne = async (id) => {
    try{
        return await prisma.events.findFirstOrThrow({
            where: { id }
        })
    }catch(err){
        throwError(err)
    }
}

module.exports = { isExist, getOne, getAll }