const express = require('express');

const app = express();


app.use(express.json()); //use body parser
const port = process.env.PORT || 5000; //Define port

app.post('/login', (req, res) => {
    const usr = req.body.username
    const pwd = req.body.password
    if (usr==='UserName' && pwd==='1234'){
        res.json({'status':'Success'})
    } else {
        res.status(403).send({'err':'Incorrect login!'})
    }
        
});


app.listen(port, () => console.log(`Server is now listening on port ${port}`));