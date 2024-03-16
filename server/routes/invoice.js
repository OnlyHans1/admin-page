var express = require('express')
var router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/transaction-list', async (req, res) => {
  try {
    const detailTrans = await prisma.detailTrans.findMany({
      select: {
        order: {
          select: {
            name: true
          }
        },
        transaction: {
          select: {
            date: true,
            method: true,
            user: {
              select: {
                name: true,
                email: true,
                number: true
              }
            }
          }
        }
      }
    })
    res.status(200).json(detailTrans)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
