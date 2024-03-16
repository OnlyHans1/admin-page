var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/nationality-list', async (req, res) => {
  try {
    const nationalities = await prisma.nationality.findMany({
      select: {
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
  const { nationality, date, total, method, order } = req.body

  try {
    const transaction = await prisma.transaction.create({
      data: {
        nationalityId: nationality,
        date: date,
        total: total,
        method: method
      }
    })

    for (const o of order) {
      await prisma.detailTrans.create({
        data: {
          amount: o.amount,
          transactionId: transaction.id,
          orderId: o.id
        }
      })
    }

    // Kirim respon ke klien
    return res.status(200).json({ message: 'Tiket sudah berhasil dibuat' })
  } catch (error) {
    console.error('Error memasukkan tiket:', error)
    return res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan' })
  }
})

module.exports = router
