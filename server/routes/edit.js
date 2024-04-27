var express = require('express')
var router = express.Router()
var multer = require('multer')
var fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads' // Specify the uploads directory path
    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir)
    }
    cb(null, uploadDir) // Set the destination folder for uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name
  }
})

const upload = multer({ storage: storage })

// Handler rute PUT
router.put('/order-details/:id', upload.single('image'), async function (req, res, next) {
  const { id } = req.params
  const { title, imgName, desc, category, price } = req.body
  const imageName = req.file ? req.file.originalname : imgName // Mengambil path gambar jika tersedia

  // Lakukan validasi data, misalnya:
  if (!title || !category || !price) {
    return res.status(400).json({ error: 'Silakan isi semua input' })
  }

  try {
    // Proses data dan masukkan ke dalam database
    await prisma.order.update({
      where: { id: id },
      data: {
        image: imageName,
        name: title,
        desc: desc ? desc : '',
        category: category.toUpperCase(),
        price: parseFloat(price)
      }
    })

    // Kirim respon ke klien
    return res.status(200).json({ message: 'Order berhasil diupdate' })
  } catch (error) {
    console.error('Error mengupdate order:', error)
    return res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan' })
  }
})

module.exports = router
