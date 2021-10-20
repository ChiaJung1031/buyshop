const express = require('express');
const router = express.Router();



router.get('/admin_menu',async function (req, res) {
    return res.render('admin_menu');
});

module.exports = router;