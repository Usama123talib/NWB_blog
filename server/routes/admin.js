const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

const adminLayout = '../views/layout/admin';

/**
 * GET /
 *  Admin - Login Page
 */
router.get('/admin', async (req, res) => {
    
    try {
        const locals = {
         title: 'Admin Panel',
         discription: 'NWB Admin Portal'
        };
        // console.log(data);
        res.render('admin/index', {locals, layout: adminLayout});
    } catch (error) {
        console.log(error);
    }

});

/**
 * Post /
 *  Admin - Check Login
 */
router.post('/admin', async (req, res) => {
    
    try {
      const {username, password} = req.body;
         console.log(req.body);

         if (req.body.username === 'admin' && req.body.password === 'password') {
            res.send('Congrates you are login ');
         } else {
            res.send('Wronge password please correct password or username ');

         }

         res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }

});

/**
 * Post /
 *  Register - Check Login
 */
router.post('/register', async (req, res) => {
    
    try {
      const {username, password} = req.body;
         console.log(req.body);
        

         res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }

});


module.exports = router;