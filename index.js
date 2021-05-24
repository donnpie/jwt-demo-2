const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

//Routers
const auth = require('./routes/auth');
const contentRouter = require('./routes/contentRouter');


const app = express();
const port = process.env.PORT || 5000;

//Connect to MongoDB
const usersDb = require('./config/key').mongoUsersUri;
mongoose.connect(usersDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to remote mongo Users DB..."))
    .catch(err => console.log(err));

//Cross origin permission
app.use(cors({
    origin: ['*','http://localhost:3000', process.env.PORT]
}));

//Middleware
app.use(helmet());
app.use(express.json()); //use body parser


//Use routes
app.use('/api/user', auth);
app.use('/api/route', contentRouter);

app.listen(port, () => console.log(`Server is now listening on port ${port}...`));

