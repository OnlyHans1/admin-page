var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
  const { nationality, date, total, method, discount, order } = req.body

  try {
    // Menemukan pengguna dengan nama "Teddy Lazuardi"
    const user = await prisma.user.findFirst({
      where: {
        name: 'Teddy Lazuardi'
      }
    })

    if (!user) {
      throw new Error('Pengguna tidak ditemukan')
    }

    // Membuat transaksi dan menghubungkannya dengan pengguna
    const transaction = await prisma.transaction.create({
      data: {
        nationality: {
          connect: {
            id: nationality
          }
        },
        date: date,
        total: total,
        method: method,
        status: 'DAPAT_DIGUNAKAN',
        discount: discount,
        user: {
          connect: {
            id: user.id
          }
        }
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
          order: {
            connect: {
              id: o.id,
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
