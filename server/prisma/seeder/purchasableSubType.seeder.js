const { throwError } = require("../../routes/utils/helper")
const { prisma } = require("../../routes/utils/prisma")

const subTypes = [
    {
        name: "Tiket Biasa",
        typeId: 1,
    },
    {
        name: "Tiket Full Category",
        typeId: 1
    },
    {
        name: "Silaturahmi",
        typeId: 2,
    },
    {
        name: "Non Silaturahmi",
        typeId: 2,
    },
    {
        name: "Pelajar",
        typeId: 2,
    }
]

const subTypeSeed = async () => {
    try{
        for(let subType of subTypes){
            await prisma.purchasableSubType.upsert({
                where: { name: subType.name },
                create: subType, update: subType
            })
        }        
    }catch(err){
        throwError(err)
    }
}

module.exports = { subTypeSeed }