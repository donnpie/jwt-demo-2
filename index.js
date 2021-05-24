const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


app.use(express.json()); //use body parser
const port = process.env.PORT || 5000; //Define port

//Authorisation endpoint
app.post('/login', (req, res) => {
    const usr = req.body.username
    const pwd = req.body.password
    if (usr==='UserName' && pwd==='1234'){
        payload = {
            'name': usr,
            'admin': false
            }
            const token = jwt.sign(
                JSON.stringify(payload), 
                'jwt-secret',
                {algorithm: 'HS256'}
            )
            res.send({'token': token});
            //Client must store this token and send it with future requests
            //See the resource request below to see how the token is used by the server to authenticate a request
    } else {
        res.status(403).send({'err':'Incorrect login!'})
    }
});

//Resource endpoint
app.get('/resource', (req, res) => {
    //The authorisation header key is 'Authorisation'
    //The authorisation header value is 'Bearer <token>', where <token> is obtained from the auth request above
    //Note there must be exactly 1 space between Bearer and token
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1]; //The [1] is to get the token after "Bearer"
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        res.send({'msg':
            `Hello, ${decoded.name}! Your JSON Web Token has been verified.`
        })
    }catch (err) {
        res.status(401).send({'err': 'Bad JWT!'})
    }
});

app.listen(port, () => console.log(`Server is now listening on port ${port}`));