//jwt-demo2 /routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Create new username and password (api/user/register)
router.post('/register', async (req, res) => {
    const usr = req.body.username;
    const email = req.body.email;
    const pwd = req.body.password;
    const routeAccess = req.body.routeAccess;

    //Check if username exists and add to DB if not
    let user = await User.findOne({userName: usr});
    if (user) return res.status(400).send('User already exists');

    user = new User({
        userName: usr,
        email: email,
        password: pwd,
        routeAccess
    })

    await user.save();

    res.send(user);

});

//Check user credentials (api/user/login)
router.post('/login', async (req, res) => {
    const usr = req.body.username
    const pwd = req.body.password

    //Fetch username and password from db
    let user = await User.findOne({userName: usr, password: pwd})
    if (user){
        //Check the permissions for user
        const hasAccessToRoute_a = hasRoute(user.routeAccess, "a");
        const hasAccessToRoute_b = hasRoute(user.routeAccess, "b");
        const hasAccessToRoute_c = hasRoute(user.routeAccess, "c");

        //Change the admin value to true to grant admin rights
        const payload = {
            'name': usr,
            'admin': false,
            'route_a': hasAccessToRoute_a,
            'route_b': hasAccessToRoute_b,
            'route_c': hasAccessToRoute_c
            }
            const token = jwt.sign(
                JSON.stringify(payload), 
                'jwt-secret',
                {algorithm: 'HS256'}
            )
            let response = {};
            response['payload'] = payload;
            response['token'] = token;

            res.send(response);
            //Client must store this token and send it with future requests
            //See the resource request below to see how the token is used by the server to authenticate a request
    } else {
        res.status(403).send({'err':'Incorrect username or password'})
    }
});

function hasRoute(array, letter) {
    return array.includes(letter);
}

module.exports = router;