var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.post('/order-details', async function (req, res, next) {
  const { image, name, desc, price, category } = req.body

  if (!name || !desc || !price) {
    return res.status(400).json({ error: 'Silakan isi semua input' })
  }

  try {
    // Periksa apakah data dengan nama dan kategori yang sama sudah ada di database
    const existingOrder = await prisma.order.findFirst({
      where: {
        AND: [{ name: name }, { category: category }]
      }
    })

    if (existingOrder) {
      // Jika data sudah ada, kirim respon ke klien
      return res.status(400).json({ error: 'Tiket dengan nama dan kategori yang sama sudah ada' })
    } else {
      // Jika data belum ada, buat entri baru
      await prisma.order.create({
        data: {
          image: image,
          name: name,
          desc: desc,
          price: price,
          category: category
        }
      })

      // Kirim respon ke klien
      return res.status(200).json({ message: 'Tiket sudah berhasil dibuat' })
    }
  } catch (error) {
    console.error('Error memasukkan tiket:', error)
    return res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan' })
  }
})

module.exports = router
