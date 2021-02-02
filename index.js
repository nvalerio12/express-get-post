const { json } = require('express');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')

// MiddleWare
// This will help us use our layout file
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}));

// for views use .ejs files
app.set('view engine', 'ejs')

// Routes 
app.get('/', (req, res) => {
    res.send('Hi there')
})


// Index View
// This url: localhost:8000/disnosaurs
app.get('/dinosaurs', (req, res) => {
    let dinos = fs.readFileSync('./dinosaurs.json')
    // take our data and put in more readable format
    dinos = JSON.parse(dinos)
    console.log(dinos)
    // In our views folder render this page
    res.render('dinosaurs/index', { dinos: dinos })
})

app.get('/dinosaurs/new', (req, res) => {
    res.render('dinosaurs/new')
})

//Shoe View
app.get('/dinosaurs/:index', (req, res) => {
    let dinos = fs.readFileSync('./dinosaurs.json')
    // take our data and put it in a more readable format
    dinos = JSON.parse(dinos)
    // get the dino thats asked for
    // req.params.index
    const dino = dinos[req.params.index]
    res.render('dinosaurs/show', { dino })
})


app.post('/dinosaurs', (req, res) => {
    console.log(req.body)
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port, ${PORT}`);
});