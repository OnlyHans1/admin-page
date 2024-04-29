const { throwError } = require("../../routes/utils/helper")
const { prisma } = require("../../routes/utils/prisma")
const CryptoJS = require('crypto-js');

const hashPassword = (password) => {
  const hashedPassword = CryptoJS.SHA256(password).toString();
  return hashedPassword;
};

const cashiers = [
    {
        name: 'Teddy Lazuardi',
        email: 'TeddyLazuardi@gmail.com',
        number: '085678901234',
        password: hashPassword('Teddy1234'),
      },
      {
        name: 'admin',
        email: 'admin@dewa.com',
        number: '999999999999',
        password: hashPassword('admin'),
      }
]

const cashierData = async () => {
    try{
        await prisma.cashier.createMany({ data: cashiers })
    }catch(err){
        throwError(err)
    }
}

module.exports = { cashierData }