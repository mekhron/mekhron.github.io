const express = require('express');
const fetch = require("node-fetch")

// Define Express App
const app = express();
const PORT = process.env.PORT || 3000;

const time = 1000*60*29
const appName = 'https://coronavirus-us-stats.herokuapp.com'


// Serve Static Assets
app.use(express.static('public'));

setInterval(() => {
    fetch(appName)
        .then(res => {
            return res.status
        })
        .then(status => {
            console.log(status)
        })
        .catch(res => {
            console.log(res.message)
        })
}, time)

app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});