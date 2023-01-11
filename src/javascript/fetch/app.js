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
        id: "2",
        item: req.query.item,
        quantity: req.query.quantity,
        unit: req.query.unit,
        responsible: req.query.responsible
    });
    res.send(200);
})

// DELETE
app.delete('/api/items/:id', (req, res) => {
    const matchingItem = items.filter(a => a.id === req.params.id);
    if (matchingItem.length <= 0) {
        res.send(404);
    }
    res.json(matchingItem[0])
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