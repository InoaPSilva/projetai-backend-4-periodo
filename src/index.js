const express = require('express');

const app = express();

// parse the data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for test purpuses 
app.get('/', (req, res) => {
    res.send('works goddammit!')
});

// Defines the listening door
app.listen(3000);