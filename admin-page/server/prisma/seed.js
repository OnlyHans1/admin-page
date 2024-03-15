const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    name: 'Teddy Lazuardi',
    email: 'TeddyLazuardi@gmail.com',
    password: 'Teddy1234',
    role: 'ADMIN'
  }
]

const orderData = [
  {
    name: 'Tiket masuk Keraton Kasepuhan Cirebon',
    price: 10000.00,
    category: 'UMUM'
  },
  {
    name: 'Tiket masuk Keraton Kasepuhan Cirebon',
    price: 10000.00,
    category: 'PELAJAR'
  },
  {
    name: 'Tiket masuk Keraton Kasepuhan Cirebon',
    price: 10000.00,
    category: 'MANCANEGARA'
  },
  {
    name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
    price: 30000.00,
    category: 'UMUM'
  },
  {
    name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
    price: 30000.00,
    category: 'PELAJAR'
  },
  {
    name: 'Bundling tiket masuk Keraton Kasepuhan Cirebon',
    price: 30000.00,
    category: 'MANCANEGARA'
  },
  {
    name: 'Bertemu Pangeran',
    price: 25000.00,
    category: 'UMUM'
  },
  {
    name: 'Bertemu Pangeran',
    price: 25000.00,
    category: 'PELAJAR'
  },
  {
    name: 'Bertemu Pangeran',
    price: 25000.00,
    category: 'MANCANEGARA'
  },
  {
    name: 'Event bulanan',
    price: 15000.00,
    category: 'UMUM',
    interval: 'PERBULAN'
  },
  {
    name: 'Event bulanan',
    price: 15000.00,
    category: 'PELAJAR',
    interval: 'PERBULAN'
  },
  {
    name: 'Event bulanan',
    price: 15000.00,
    category: 'MANCANEGARA',
    interval: 'PERBULAN'
  },
  {
    name: 'Event mingguan',
    price: 15000.00,
    category: 'UMUM',
    interval: 'PERMINGGU'
  },
  {
    name: 'Event mingguan',
    price: 15000.00,
    category: 'PELAJAR',
    interval: 'PERMINGGU'
  },
  {
    name: 'Event mingguan',
    price: 15000.00,
    category: 'MANCANEGARA',
    interval: 'PERMINGGU'
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const o of orderData) {
    const order = await prisma.order.create({
      data: o
    })
    console.log(`Created order with id: ${order.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
