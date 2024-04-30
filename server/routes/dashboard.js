var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const cashier = await prisma.cashier.findFirst({
      where: {
        name: name,
        password: CryptoJS.SHA256(password).toString()
      },
    });

    if (!cashier) {
      return res.status(401).json({ message: 'Kredensial tidak valid' });
    }
    const token = jwt.sign(cashier, process.env.SECRET_KEY_AUTH)

    res.status(200).json({ token: token, cashier: cashier });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});


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
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-order/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Mencari pesanan dengan ID yang diberikan
    const order = await prisma.order.findFirst({
      where: {
        id: id,
      },
    });

    // Memeriksa apakah pesanan ditemukan
    if (!order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    // Menghapus pesanan
    await prisma.order.delete({
      where: {
        id: id,
      },
    });

    // Memberikan respons yang menunjukkan penghapusan berhasil
    res.status(200).json({ message: 'Pesanan berhasil dihapus' });
  } catch (error) {
    // Menangani error dengan lebih spesifik
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus pesanan' });
  }
});

module.exports = router
