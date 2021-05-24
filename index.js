const express = require('express');

const app = express();


app.use(express.json()); //use body parser
const port = process.env.PORT || 5000; //Define port

app.post('/login', (req, res) => {
    const usr = req.body.username
    const pwd = req.body.password
    res.send(`Username: ${usr}\n Password: ${pwd}`)
    })


app.listen(port, () => console.log(`Server is now listening on port ${port}`));