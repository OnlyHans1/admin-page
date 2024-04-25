var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const CryptoJS = require('crypto-js');

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

    res.status(200).json({ message: 'Login berhasil', cashier: cashier });
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

module.exports = router
