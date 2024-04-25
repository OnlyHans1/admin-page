const { throwError } = require("../../routes/utils/helper")
const { prisma } = require("../../routes/utils/prisma")
const bcrypt = require('bcrypt')

const orderData = [
    {
      name: 'Tiket masuk Keraton Kasepuhan Cirebon',
      price: 10000.0,
      category: 'UMUM'
    },
    {
      name: 'Tiket masuk Keraton Kasepuhan Cirebon',
      price: 10000.0,
      category: 'PELAJAR'
    },
    {
      name: 'Tiket masuk Keraton Kasepuhan Cirebon',
      price: 10000.0,
      category: 'MANCANEGARA'
    },
    {
      name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
      price: 30000.0,
      category: 'UMUM'
    },
    {
      name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
      price: 30000.0,
      category: 'PELAJAR'
    },
    {
      name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
      price: 30000.0,
      category: 'MANCANEGARA'
    },
    {
      name: 'Bertemu Pangeran',
      price: 25000.0,
      category: 'UMUM'
    },
    {
      name: 'Bertemu Pangeran',
      price: 25000.0,
      category: 'PELAJAR'
    },
    {
      name: 'Bertemu Pangeran',
      price: 25000.0,
      category: 'MANCANEGARA'
    },
    {
      name: 'Event bulanan',
      price: 15000.0,
      category: 'UMUM',
      interval: 'PERBULAN'
    },
    {
      name: 'Event bulanan',
      price: 15000.0,
      category: 'PELAJAR',
      interval: 'PERBULAN'
    },
    {
      name: 'Event bulanan',
      price: 15000.0,
      category: 'MANCANEGARA',
      interval: 'PERBULAN'
    },
    {
      name: 'Event mingguan',
      price: 15000.0,
      category: 'UMUM',
      interval: 'PERMINGGU'
    },
    {
      name: 'Event mingguan',
      price: 15000.0,
      category: 'PELAJAR',
      interval: 'PERMINGGU'
    },
    {
      name: 'Event mingguan',
      price: 15000.0,
      category: 'MANCANEGARA',
      interval: 'PERMINGGU'
    }
  ]

const orderDataSeed = async () => {
    try {
        await prisma.order.createMany({ data: orderData })
    } catch (err) {
        throwError(err)
    }
}

module.exports = { orderDataSeed }