const express = require('express');
const router = express.Router();



router.get('/admin_searchproduct',async function (req, res) {
    return res.render('admin_searchproduct');
});

module.exports = router;