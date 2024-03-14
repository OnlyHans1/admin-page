var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/order-list', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        image: true,
        name: true,
        category: true,
        price: true,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router
