const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.post('/add', async function (req, res, next) {
  const { image, name, desc, price, category } = req.body

  if (!name || !desc || !price) {
    return res.status(400).json({ error: 'Tolong isi semua input' })
  }

  try {
    const existingOrder = await prisma.order.findFirst({
      where: {
        AND: [{ name: name }, { category: category }]
      }
    })

    if (existingOrder) {
      return res.status(400).json({ error: 'Tiket dengan nama dan kategori yang sama sudah ada' })
    } else {
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
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/report', async function (req, res, next) {
  try {
    // Ambil data berdasarkan kategori yang diminta, jika ada
    const detailTrans = await prisma.detailTrans.findMany({
      where: req.query.category ? { order: { category: req.query.category.toUpperCase() } } : {},
      include: {
        // Menyertakan relasi 'transaction' dan 'order'
        transaction: {
          select: {
            date: true,
            total: true
          }
        },
        order: {
          select: {
            name: true,
            category: true
          }
        }
      }
    })

    // Kirim respons dengan data yang diminta ke klien
    res.status(200).json(detailTrans)
  } catch (error) {
    console.error('Error mengambil data:', error)
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
)
