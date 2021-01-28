const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbPath = 'mongodb://localhost/contact-tracking-system';
const apiRoutes = require("./routes");
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Hello from proxy server.'
    })
})

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});
