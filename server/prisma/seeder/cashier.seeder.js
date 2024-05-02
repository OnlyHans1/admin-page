const { throwError } = require("../../routes/utils/helper")
const { prisma } = require("../../routes/utils/prisma")
const bcrypt = require('bcrypt')

const cashiers = [
    {
        name: 'Teddy Lazuardi',
        email: 'TeddyLazuardi@gmail.com',
        number: '085678901234',
        password: 'Teddy1234',
      },
      {
        name: 'admin',
        email: 'admin@dewa.com',
        number: '999999999999',
        password: 'admin',
      }
]

const cashierData = async () => {
  try {
      for (let cashier of cashiers) {
          const salt = await bcrypt.genSalt()
          cashier.password = await bcrypt.hash(cashier.password, salt)
          await prisma.cashier.upsert({
              where: { email: cashier.email },
              create: cashier, update: cashier
          })
      }
  } catch (err) {
      throwError(err)
  }
}

module.exports = { cashierData }