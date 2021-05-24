//jwt-demo2 /routes/contentRouter.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Content A endpoint
router.get('/a', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
     
    try {
        const payload = jwt.verify(token, 'jwt-secret')
        if (payload.route_a) {
            res.send({'msg':
                `${payload.name} is authorised to access endpoint a`
            });
        } else {
            res.send({'msg':
                `${payload.name} is NOT authorised to access endpoint a`
            });
        }
    }catch (err) {
        res.status(401).send({'err': 'Bad JWT!'});
        //See 401 below
    }
});

//Content B endpoint
router.get('/b', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
     
    try {
        const payload = jwt.verify(token, 'jwt-secret')
        if (payload.route_b) {
            res.send({'msg':
                `${payload.name} is authorised to access endpoint b`
            });
        } else {
            res.send({'msg':
                `${payload.name} is NOT authorised to access endpoint b`
            });
        }
    }catch (err) {
        res.status(401).send({'err': 'Bad JWT!'});
        //See 401 below
    }
});

//Content C endpoint
router.get('/c', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
     
    try {
        const payload = jwt.verify(token, 'jwt-secret')
        if (payload.route_c) {
            res.send({'msg':
                `${payload.name} is authorised to access endpoint c`
            });
        } else {
            res.send({'msg':
                `${payload.name} is NOT authorised to access endpoint c`
            });
        }
    }catch (err) {
        res.status(401).send({'err': 'Bad JWT!'});
        //See 401 below
    }
});


//Sample code
// router.get('/admin_resource', (req, res) => {
//     const token = req.headers['authorization'].split(' ')[1]
//     try {
//         const decoded = jwt.verify(token, 'jwt-secret')
//         if (decoded.admin){
//             //To get this to work, you must first generate a valid admin token
//             //Set admin = true in the auth post request above and use that token in this request
//             res.send({'msg': 'Success!'})
//         } else {
//             res.status(403).send(
//                 //See 403 below
//             {'msg': 'Your JWT was verified, but you are not an admin.'})
//         }
//     } catch (e) {
//         res.sendStatus(401)
//     }
// });

module.exports = router;