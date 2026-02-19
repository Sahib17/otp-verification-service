const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

router.post('/sendmail', controller)

router.get('/', (req, res) => {
    res.status(200).send('hi')
})

module.exports = router