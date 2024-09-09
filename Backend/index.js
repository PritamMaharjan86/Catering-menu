const express = require('express');
const app = express(); const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');


const PORT = process.env.PORT || 8080;



app.get('/ping', (req, res) => {
    res.send('I AM RUNNING');
})

app.use(bodyParser.json());

app.use(cors());

app.use('/auth', AuthRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

})