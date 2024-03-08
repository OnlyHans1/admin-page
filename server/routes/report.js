var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/table-data', async function (req, res, next) {
  try {
    // Ambil data berdasarkan kategori yang diminta, jika ada
    const detailTrans = await prisma.detailTrans.findMany({
      where: req.query.category ? { order: { category: req.query.category.toUpperCase() } } : {},
      select: {
        amount: true,
        transaction : {
          select : { date: true }
        },
        order: {
          select: { id: true, name: true, category: true, price: true }
        }
      }
    })

    // Menghitung total harga pesanan dan menggabungkannya dengan hasil
    const finalDetailTrans = detailTrans.map(detailTrans => ({
      ...detailTrans,
      total_price: detailTrans.amount * detailTrans.order.price
    }));

    // Kirim respons dengan data yang diminta ke klien
    res.status(200).json(finalDetailTrans)
  } catch (error) {
    console.error('Error mengambil data table:', error)
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.get('/order-info', async function (req, res, next) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        detailTrans: true,
      },
    });

    const orderInfo = orders.map(order => ({
      category: order.category,
      sum: order.detailTrans.reduce((total, detail) => total + detail.amount, 0),
    }));

    res.status(200).json(orderInfo)
  } catch (error) {
    console.error('Error mengambil data order info:', error)
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
