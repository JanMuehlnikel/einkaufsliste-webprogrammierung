const express = require('express');
const app = express();
const path = require('path');

let items = [
    {id: "1", item:"Apfel", quantity:"4", unit:"Stück", responsible:"jan"},
]

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});

// POST
app.post("/api/items", (req, res) => {
    items.push({
        id: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2), //unique id with time + random number
        item: req.query.item,
        quantity: req.query.quantity,
        unit: req.query.unit,
        responsible: req.query.responsible
    });
    res.send(200);
})

// DELETE
app.delete('/api/items/:id', (req, res) => {
    const {id} = req.params

    // check if item is in array
    const deleted = items.find(i => i.id == id)
    if (deleted) {
        // filter out the deleted id and create new array without the id
        items = items.filter(i => i.id != id)
        res.status(200).json(deleted)
    }else{
        res.status(404).json({message: + " ID" + id + " was not found!"})
    }
})

// GET
app.get('/api/items', (req, res) => res.json(items));
app.get('/api/items/:id', (req, res) => {
    const matchingItem = items.filter(a => a.id === req.params.id);
    if (matchingItem.length <= 0) {
        res.send(404);
    }
    res.json(matchingItem[0])
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;