const express = require('express');
const router = express.Router();



router.get('/admin_login',async function (req, res) {
    return res.render('admin_login');
});

module.exports = router;