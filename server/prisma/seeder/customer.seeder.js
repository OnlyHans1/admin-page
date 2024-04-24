const { throwError } = require("../../routes/utils/helper")
const { prisma } = require("../../routes/utils/prisma")
const bcrypt = require('bcrypt')

const customers = [
    {
        name: "Customers 1",
        email: "customer1@gmail.com",
        password: "password"
    },
    {
        name: "Customers 2",
        email: "customer2@gmail.com",
        password: "password"
    },
]

const userSeed = async () => {
    try{
        for(let customer of customers){
            const salt = await bcrypt.genSalt()
            customer.password = await bcrypt.hash(customer.password, salt)
            await prisma.customer.create({ data: { ...customer } })
        }
    }catch(err){
        throwError(err)
    }
}

module.exports = { userSeed }