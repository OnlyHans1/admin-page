var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

router.post('/login', async (req, res) => {
  const { name, password } = req.body

  try {
    const cashier = await prisma.cashier.findFirst({
      where: {
        name: name
      }
    })

    if (!cashier) {
      return res.status(401).json({ message: 'Username tidak ditemukan' })
    }
    await bcrypt.compare(password, cashier.password).then((match) => {
      if (!match) throw Error('Password tidak sesuai')
    })

    const token = jwt.sign(cashier, process.env.SECRET_KEY_AUTH, { expiresIn: '1h' })

    res.status(200).json({ token: token })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Terjadi kesalahan saat login' })
  }
})

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia' })
  }

  jwt.verify(token, process.env.SECRET_KEY_AUTH, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token tidak valid' })
    }
    req.cashier = decoded
    next()
  })
}

router.get('/authorized', verifyToken, async (req, res) => {
  try {
    const id = req.cashier.id
    const cashier = await prisma.cashier.findFirst({
      where: {
        id: id
      }
    })

    if (!cashier) {
      return res.status(404).json({ message: 'Data kasir tidak ditemukan' })
    }

    res.status(200).json(cashier)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data kasir' })
  }
})

router.get('/order-list', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        category: true,
        price: true,
        createdAt: true,
        desc: true
      }
    })
    res.status(200).json(orders)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/delete-order/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Mencari pesanan dengan ID yang diberikan
    const order = await prisma.order.findFirst({
      where: { id: id }
    })

    // Memeriksa apakah pesanan ditemukan
    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' })
    }

    // Mencari detail transaksi terkait menggunakan ID pesanan
    const detailTrans = await prisma.detailTrans.findFirst({
      where: {
        orderID: id
      },
      select: {
        id: true,
        amount: true,
        transactionID: true
      }
    })

    // Inisialisasi nama file log dan path
    const logFileName = `log-${new Date().toISOString().slice(0, 10)}.txt`
    const logFilePath = path.join(path.dirname(__dirname), 'logs', logFileName)

    // Buat folder logs jika belum ada
    if (!fs.existsSync(path.join(path.dirname(__dirname), 'logs'))) {
      fs.mkdirSync(path.join(path.dirname(__dirname), 'logs'))
    }

    // Fungsi untuk menulis log ke file
    const writeLog = (log) => {
      fs.appendFileSync(logFilePath, log + '\n', (err) => {
        if (err) {
          console.error('Gagal menulis log:', err)
        }
      })
    }

    // Jika ada detail transaksi terkait, maka lakukan penghapusan
    if (detailTrans) {
      const transaction = await prisma.transaction.findFirst({
        where: { id: detailTrans.transactionID },
        select: { total: true, discount: true }
      })
      await prisma.transaction.update({
        where: { id: detailTrans.transactionID },
        data: {
          total: (transaction.total -=
            order.price * detailTrans.amount + 3500 - transaction.discount)
        }
      })
      await prisma.detailTrans.delete({
        where: { id: detailTrans.id }
      })

      writeLog(
        `Detail transaksi dengan ID ${detailTrans.id} yang memiliki kaitan dengan pesanan ${order.name} berhasil dihapus.`
      )

      if (transaction.total < 1) {
        await prisma.transaction.delete({
          where: { id: detailTrans.transactionID }
        })
        writeLog(
          `Transaksi dengan ID ${detailTrans.transactionID} juga dihapus karena nilai totalnya kosong.`
        )
      }
    }

    // Menghapus pesanan
    await prisma.order.delete({
      where: { id: id }
    })

    writeLog(`Pesanan ${order.name} (${order.category}) dengan ID ${order.id} berhasil dihapus.`)

    // Memberikan respons yang menunjukkan penghapusan berhasil
    res.status(200).json({ message: 'Pesanan berhasil dihapus' })
  } catch (error) {
    // Menangani error dengan lebih spesifik
    console.error(error)
    res.status(500).json({ error: 'Gagal menghapus pesanan' })
  }
})

module.exports = router
