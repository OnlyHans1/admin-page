var express = require('express')
var router = express.Router()
const { PrismaClient, Category } = require('@prisma/client')
const prisma = new PrismaClient()

// Mengambil tanggal hari ini
const today = new Date()
// Menyiapkan startDate untuk nilai greater than
const startDate = new Date(today)
startDate.setHours(7, 0, 0, 0)
// Menyiapkan endDate untuk nilai less than
const endDate = new Date(today)
endDate.setHours(30, 59, 59, 999)

const monthMap = {
  1: 'Januari',
  2: 'Februari',
  3: 'Maret',
  4: 'April',
  5: 'Mei',
  6: 'Juni',
  7: 'Juli',
  8: 'Agustus',
  9: 'September',
  10: 'Oktober',
  11: 'November',
  12: 'Desember'
}

// Fungsi untuk menghasilkan kategori tahun berdasarkan data tahunan
function generateYearlyCategory(yearlyData) {
  const months = {
    1: 'JAN',
    2: 'FEB',
    3: 'MAR',
    4: 'APR',
    5: 'MAY',
    6: 'JUN',
    7: 'JUL',
    8: 'AUG',
    9: 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DEC'
  }

  let usedMonths = 0

  yearlyData.forEach((order) => {
    order.detailTrans.forEach((detail) => {
      const month = detail.transaction.date.getMonth() + 1
      usedMonths = month
    })
  })

  const yearlyCategory = ['']
  for (let month = 1; month <= 12; month++) {
    if (usedMonths >= month) {
      yearlyCategory.push(months[month])
    }
  }
  return yearlyCategory
}
// Fungsi untuk menghasilkan kategori bulan berdasarkan data bulanan
function generateMonthlyCategory(monthlyData, daysInMonth) {
  let usedDays = 0

  monthlyData.forEach((order) => {
    order.detailTrans.forEach((detail) => {
      const day = detail.transaction.date.getDate()
      usedDays = day
    })
  })

  const monthlyCategory = ['']
  for (let day = 1; day <= daysInMonth; day++) {
    if (usedDays >= day) {
      monthlyCategory.push(day)
    }
  }
  return monthlyCategory
}

// Endpoint API Table Report Activity Data
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

// Endpoint API Order Info Report Card Data
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
    })

    // Inisialisasi objek untuk menyimpan hasil grouping
    const groupedOrders = {}

    // Looping pesanan
    orders.forEach((order) => {
      // Jika kategori belum ada dalam objek groupedOrders, tambahkan
      if (!groupedOrders[order.category]) {
        groupedOrders[order.category] = 0
      }
      // Menambahkan jumlah dari setiap detail transaksi ke jumlah kategori yang sesuai
      order.detailTrans.forEach((detail) => {
        groupedOrders[order.category] += detail.amount
      })
    })

    // Ubah format objek ke dalam array
    const orderInfo = Object.keys(groupedOrders).map((category) => ({
      category,
      sum: groupedOrders[category]
    }))

    // Mendefinisikan order by
    const orderCategory = [Category.UMUM, Category.PELAJAR, Category.MANCANEGARA]

    // Mengurutkan orderInfo sesuai dengan order by
    orderInfo.sort((a, b) => orderCategory.indexOf(a.category) - orderCategory.indexOf(b.category))

    res.status(200).json(orderInfo)
  } catch (error) {
    console.error('Error mengambil data order info:', error)
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Endpoint API ReportView
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

// Endpoint API Chart Report Data
router.get('/yearly-chart-data/:targetYear', async (req, res, next) => {
  try {
    const targetYear = parseInt(req.params.targetYear)
    const startDate = new Date(`${targetYear}-01-01`)
    startDate.setHours(7, 0, 0, 0)
    const endDate = new Date(`${targetYear}-12-31`)
    endDate.setHours(30, 59, 59, 999)

    const yearlyData = await prisma.order.findMany({
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
            amount: true,
            transaction: {
              select: {
                date: true
              }
            }
          }
        }
      }
    })

    const categories = ['Umum', 'Pelajar', 'Mancanegara'] // Anda dapat mengambil ini secara dinamis dari sumber data Anda atau menentukan di tempat lain
    const colors = ['#35E490', '#5855EE', '#7C0428'] // Anda dapat mengambil ini secara dinamis dari sumber data Anda atau menentukan di tempat lain

    const yearlyChartData = categories.map((category, index) => {
      return {
        name: category,
        color: colors[index],
        data: [0, ...Array.from({ length: 11 }, () => 0)] // Menambahkan data kosong di index 0
      }
    })

    // Mengisi data langsung dengan amount
    yearlyData.forEach((order) => {
      const categoryIndex = categories
        .map((cat) => cat.toUpperCase())
        .indexOf(order.category.toUpperCase())
      order.detailTrans.forEach((detail) => {
        const month = detail.transaction.date.getMonth() + 1
        const amount = detail.amount
        if (categoryIndex !== -1) {
          yearlyChartData[categoryIndex].data[month] += parseInt(amount)
        }
      })
    })

    const yearlyCategory = generateYearlyCategory(yearlyData)

    res.json({
      targetYear,
      yearlyCategory: yearlyCategory,
      yearlyData: yearlyChartData
    })
  } catch (error) {
    console.error('Error mengambil data order info:', error)
    // Kirim respons jika terjadi kesalahan
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.get('/monthly-chart-data/:targetYear/:targetMonth', async (req, res, next) => {
  try {
    const targetYear = parseInt(req.params.targetYear)
    const targetMonthInt = parseInt(req.params.targetMonth)

    const daysInMonth = new Date(targetYear, targetMonthInt, 0).getDate()
    const startTarget = new Date(`${targetYear}-${targetMonthInt}-01`)
    startTarget.setHours(7, 0, 0, 0)
    const endTarget = new Date(`${targetYear}-${targetMonthInt}-${daysInMonth}`)
    endTarget.setHours(30, 59, 59, 999)

    const monthlyData = await prisma.order.findMany({
      select: {
        category: true,
        detailTrans: {
          where: {
            transaction: {
              date: {
                gte: startTarget,
                lte: endTarget
              }
            }
          },
          select: {
            amount: true,
            transaction: {
              select: {
                date: true
              }
            }
          }
        }
      }
    })

    const categories = ['Umum', 'Pelajar', 'Mancanegara'] // Anda dapat mengambil ini secara dinamis dari sumber data Anda atau menentukan di tempat lain
    const colors = ['#35E490', '#5855EE', '#7C0428'] // Anda dapat mengambil ini secara dinamis dari sumber data Anda atau menentukan di tempat lain

    const monthlyChartData = categories.map((category, index) => {
      return {
        name: category,
        color: colors[index],
        data: [0, ...Array.from({ length: daysInMonth }, () => 0)] // Menambahkan data kosong di index 0
      }
    })

    // Mengisi data langsung dengan amount
    monthlyData.forEach((order) => {
      const categoryIndex = categories
        .map((cat) => cat.toUpperCase())
        .indexOf(order.category.toUpperCase())
      order.detailTrans.forEach((detail) => {
        const day = detail.transaction.date.getDate()
        const amount = detail.amount
        if (categoryIndex !== -1) {
          monthlyChartData[categoryIndex].data[day] += amount
        }
      })
    })

    const monthlyCategory = generateMonthlyCategory(monthlyData, daysInMonth)
    const targetMonth = monthMap[targetMonthInt]

    res.status(200).json({
      targetMonth,
      monthlyCategory: monthlyCategory,
      monthlyData: Object.values(monthlyChartData)
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})
module.exports = router
