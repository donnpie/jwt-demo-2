//jwt-demo2 /routes/contentRouter.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Content A endpoint
router.get('/a', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    checkRoute(res, token, "a");
});

//Content B endpoint
router.get('/b', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    checkRoute(res, token, "b");
});

//Content C endpoint
router.get('/c', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    checkRoute(res, token, "c");
});

function checkRoute(res, token, routeLetter) {
    try {
        const payload = jwt.verify(token, 'jwt-secret');
        const route = 'route_' + routeLetter;
        if (payload[route]) {
            res.send({'msg':
                `${payload.name} is authorised to access endpoint ${routeLetter}`
            });
        } else {
            res.send({'msg':
                `${payload.name} is NOT authorised to access endpoint ${routeLetter}`
            });
        }
    }catch (err) {
        res.status(401).send({'err': 'Bad JWT!'});
    }
}

module.exports = router;