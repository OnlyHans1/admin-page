var express = require('express');
var router = express.Router();
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

router.get('/invoice', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
