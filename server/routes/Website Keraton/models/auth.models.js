const { throwError, generateRandomString } = require("../../utils/helper")
const { prisma } = require("../../utils/prisma")
const bcrypt = require('bcrypt')

async function isExist(obj) {
    const data = await prisma.customers.findFirst({ where: { ...obj } })
    return data
}

const generateToken = async () => {
    try {
        let generatedToken, tokenExist;
        do {
            generatedToken = generateRandomString(100);
            tokenExist = await prisma.tokens.findUnique({ where: { id: generatedToken } }); //Check if token is existed in database
        } while (tokenExist != null)
        return generatedToken;
    } catch (err) {
        throwError(err)
    }
}

const logIn = async (body) => {
    let { email, password } = body
    try {
        const customerExist = await isExist({ email })
        if (!customerExist) throw Error('Email didnt registered')
        await bcrypt.compare(password, customerExist.password).then(match => { if (!match) throw Error('Password didnt Match') })
        const generatedToken = await generateToken()
        await prisma.tokens.ceate({ data: { id: generatedToken, customerId: customerExist.id } })
        return { generatedToken, customerExist }
    } catch (err) {
        throwError(err)
    }
}

const logOut = async (id) => {
    try{
        return await prisma.tokens.deleteMany({ where: { customerId: id } })
    }catch(err){
        throwError(err)
    }
}

module.exports = {
    logIn,
    logOut
}
