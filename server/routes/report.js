var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Mengambil tanggal hari ini
const today = new Date()
// Menyiapkan startDate untuk nilai greater than
const startDate = new Date(today)
startDate.setHours(0, 0, 0, 0)
// Menyiapkan endDate untuk nilai less than
const endDate = new Date(today)
endDate.setHours(23, 59, 59, 999)

router.get('/table-data', async function (req, res, next) {
  try {
    // Ambil data berdasarkan kategori yang diminta, jika ada
    const detailTrans = await prisma.detailTrans.findMany({
      where: req.query.category ? { order: { category: req.query.category.toUpperCase() } } : {},
      select: {
        amount: true,
        transaction: {
          select: { date: true }
        },
        order: {
          select: { id: true, name: true, category: true, price: true }
        }
      }
    })

    // Menghitung total harga pesanan dan menggabungkannya dengan hasil
    const finalDetailTrans = detailTrans.map((detailTrans) => ({
      ...detailTrans,
      total_price: detailTrans.amount * detailTrans.order.price
    }))

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
    // Mengambil category dan amount dari seluruh data
    const orders = await prisma.order.findMany({
      select: {
        category: true,
        detailTrans: {
          where: {
            transaction: {
              date: {
                gte: startDate,
                lte: endDate
              }
            }
          },
          select: {
            amount: true
          }
        }
      }
    });

    // Inisialisasi objek untuk menyimpan hasil grouping
    const groupedOrders = {};

    // Looping pesanan
    orders.forEach(order => {
      // Jika kategori belum ada dalam objek groupedOrders, tambahkan
      if (!groupedOrders[order.category]) {
        groupedOrders[order.category] = 0;
      }
      // Menambahkan jumlah dari setiap detail transaksi ke jumlah kategori yang sesuai
      order.detailTrans.forEach(detail => {
        groupedOrders[order.category] += detail.amount;
      });
    });

    // Ubah format objek ke dalam array
    const orderInfo = Object.keys(groupedOrders).map(category => ({
      category,
      sum: groupedOrders[category]
    }));

    // Mendefinisikan order by
    const orderCategory = ['UMUM', 'PELAJAR', 'MANCANEGARA'];
    
    // Mengurutkan orderInfo sesuai dengan order by
    orderInfo.sort((a, b) => orderCategory.indexOf(a.category) - orderCategory.indexOf(b.category));

    res.status(200).json(orderInfo);
  } catch (error) {
    console.error('Error mengambil data order info:', error);
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/income-revenue', async function (req, res, next) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        total: true
      }
    })

    const total = transactions.reduce((acc, curr) => acc + curr.total, 0)
    const formatIncome = parseInt(total)

    res.status(200).json({ total: formatIncome })
  } catch (error) {
    console.error('Error mengambil data order info:', error)
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
module.exports = router
