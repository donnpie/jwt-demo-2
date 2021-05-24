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
        //Change the admin value to true to grant admin rights
        payload = {
            'name': usr,
            'admin': true 
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
        //See 401 below
    }
});

app.get('/admin_resource', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        if (decoded.admin){
            res.send({'msg': 'Success!'})
        } else {
            res.status(403).send(
                //See 403 below
            {'msg': 'Your JWT was verified, but you are not an admin.'})
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

app.listen(port, () => console.log(`Server is now listening on port ${port}`));

//HTTP error codes:
//https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
//400: Bad request: The server cannot or will not process the request due to an apparent client error
//401: Unauthorised: Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.
//402: Payment required
//403: Forbidden: The request contained valid data and was understood by the server, but the server is refusing action.
//404: Not found
//405: Method not allowed
//406: Not acceptable
