const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const adminLayout = '../views/layout/admin';


/**
 *  Check Login
 */

const autoMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({message: 'unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'});      
    }
}


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

      const user = await User.findOne({username});
      if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret);
      res.cookie('token', token, {httpOnly: true})
      res.redirect('/dashboard');

    } catch (error) {
        console.log(error);
    }

});



// router.post('/admin', async (req, res) => {
    
//     try {
//       const {username, password} = req.body;
//          console.log(req.body);

//          if (req.body.username === 'admin' && req.body.password === 'password') {
//             res.send('Congrates you are login ');
//          } else {
//             res.send('Wronge password please correct password or username ');

//          }

//          res.redirect('/admin');
//     } catch (error) {
//         console.log(error);
//     }

// });


/**
 * Post /
 *  Admin - To register
 */
router.post('/register', async (req, res) => {
    
    try {
      const {username, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const user = await User.create({username, password: hashedPassword});
        res.status(201).json({message: 'User Created', user})
      } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({message: 'User already in use'});
        } 
            res.status(500).json({message: 'Internal Server error'});
      }
        //  console.log(req.body);
        

         res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }

});

/**
 * GET /
 *  Admin - Dashboard
 */
router.get('/dashboard', autoMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Admin Panel',
            discription: 'NWB Admin Portal'
        };
        const data = await Post.find();
        res.render('admin/dashboard', {locals, data, layout: adminLayout});


    } catch (error) {
        console.log(error);
    }
    
    // res.render('admin/dashboard');


});

/**
 * GET /
 *  Admin - Create a Post
 */
router.get('/add-post', autoMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            discription: 'NWB Admin Portal'
        };
        const data = await Post.find();
        res.render('admin/add-post', {locals, layout: adminLayout});


    } catch (error) {
        console.log(error);
    }
});

/**
 * Post /
 *  Admin - Add a Post
 */
router.post('/add-post', autoMiddleware, async (req, res) => {
    try {
        try {
            const newPost = new Post({
                title: req.body.title,
                body: req.body.body,
            });
            await Post.create(newPost);
            res.redirect('/dashboard'); 

        } catch (error) {
          console.log(error,'Route Add a post');
        }
    } catch (error) {
        console.log(error);
    }
 
});


/**
 * GET /
 *  Admin - Edit a Post
 */
router.get('/edit-post/:id', autoMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Edit Post',
            discription: 'NWB Admin Portal'
        };

        const data = await Post.findOne({_id: req.params.id});
        res.render('admin/edit-post', {
            locals, 
            data, 
            layout: adminLayout
        });

    } catch (error) {
        console.log(error);
    } 
});

/**
 * PUT /
 *  Admin - Create a Post
 */
router.put('/edit-post/:id', autoMiddleware, async (req, res) => {
    try {
    
       await Post.findByIdAndUpdate(req.params.id, {
         title: req.body.title,
         body: req.body.body,
         updatedAt: Date.now()
       });
       res.redirect(`/edit-post/${req.params.id}`);

    } catch (error) {
        console.log(error);
    } 
});

/**
 * Delete /
 *  Admin - Create a Post
 */
router.delete('/delete-post/:id', autoMiddleware, async (req, res) => {
   try {
     await Post.deleteOne({_id: req.params.id});
     res.redirect('/dashboard')
   } catch (error) {
    
   }
});

/**
 * GET /
 *  Admin -LOGOUT
 */
router.get('/logout', async (req, res) => {
    try {
      res.clearCookie('token');
      res.redirect('/'); 
    } catch (error) {
     
    }
 });


module.exports = router;