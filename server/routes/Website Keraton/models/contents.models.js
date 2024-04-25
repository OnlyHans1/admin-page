const { text } = require("express")
const { throwError, convertFilesToURL } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")

async function isExist(id) {
    const data = await prisma.contents.findFirst({ where: { id } })
    return data
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


const createUpdate = async (ident, id, data) => {
    let context = {}
    const { textList, imageList, linkList } = data
    try {
        if (ident != "create") await isExist(id).then(exist => { if (!exist) throw Error('Content ID didnt Exist') })
        if (textList) {
            delete data.textList
            for (let textIndex in textList) {
                context[`xs${textIndex}`] = textList[textIndex]
            }
            data.context = context
        }
        if (imageList) {
            delete data.imageList
            for (let imgIndex in imageList) {
                context[`xi${imgIndex}`] = convertFilesToURL(imageList[imgIndex].path)
            }
            data.context = context
        }
        if (linkList) {
            delete data.linkList
            for (let linkIndex of linkList) {
                context[`xl${linkIndex}`] = linkList[linkIndex]
            }
            data.context = context
        }
        let dataToReturn
        if (ident != 'create') {
            dataToReturn = await prisma.contents.create({ data })
        } else dataToReturn = await prisma.contents.update({ where: { id }, data })
        return updatedContent
    } catch (err) {
        throwError(err)
    }
}


module.exports = {
    createUpdate,
    getOne,
    getAll
}
