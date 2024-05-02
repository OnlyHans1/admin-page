var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/guide-list', async (req, res) => {
  try {
    const guide = await prisma.guide.findMany()
    res.status(200).json(guide)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/nationality-list', async (req, res) => {
  try {
    const nationalities = await prisma.nationality.findMany({
      select: {
        id: true,
        name: true,
        code: true
      }
    })
    res.status(200).json(nationalities)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/create-transaction', async function (req, res, next) {
  const { name, nationality, plannedDate, total, method, discount, cashback, order } = req.body
  console.log(order)

  try {
    // Menemukan kasir dengan nama "Teddy Lazuardi"
    const cashier = await prisma.cashier.findFirst({
      where: {
        name: name
      }
    })

    if (!cashier) {
      throw new Error('Kasir tidak ditemukan')
    }

    // Membuat transaksi dan menghubungkannya dengan kasir
    const transaction = await prisma.transaction.create({
      data: {
        total: total,
        method: method,
        status: 'DAPAT_DIGUNAKAN',
        discount: discount,
        cashback: cashback,
        plannedDate: plannedDate,
        cashier: {
          connect: {
            id: cashier.id
          }
        },
        nationality: nationality
          ? {
              connect: { id: nationality }
            }
          : {}
      }
    })

    for (const o of order) {
      await prisma.detailTrans.create({
        data: {
          amount: o.amount,
          transaction: {
            connect: {
              id: transaction.id
            }
          },
          guide: {
            connect: {
              id: o.guideId
            }
          },
          order: {
            connect: {
              id: o.id
            }
          }
        }
      })
    }

    // Kirim respon ke klien
    return res.status(200).json({ message: 'Transaksi sudah berhasil dibuat' })
  } catch (error) {
    console.error('Error memasukkan tiket:', error)
    return res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan' })
  }
})

module.exports = router
