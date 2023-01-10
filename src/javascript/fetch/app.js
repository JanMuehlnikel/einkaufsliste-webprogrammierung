const express = require('express');
const app = express();
const path = require('path');

let employees = [
    { id: "1", liste: "liste1", artikel: "Apfel", menge: 1, zugeornet: "jan" },
    { id: "2", liste: "liste2", artikel: "Wasser", menge: 6, zugeornet: "jan" },
]

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});

app.post("/api/employee", (req, res) => {
    employees.push({
        id: "2",
        liste: req.query.liste,
        artikel: req.query.artikel,
        menge: req.query.menge,
        zugeornet: req.query.zugeornet
    });
    res.send(200);
})

app.delete('/api/employee/:emplId', (req, res) => {
    const matchingEmployees = employees.filter(a => a.id === req.params.emplId);
    if (matchingEmployees.length <= 0) {
        res.send(404);
    }
    res.json(matchingEmployees[0])
})

app.get('/api/employees', (req, res) => res.json(employees));
app.get('/api/employee/:emplId', (req, res) => {
    const matchingEmployees = employees.filter(a => a.id === req.params.emplId);
    if (matchingEmployees.length <= 0) {
        res.send(404);
    }
    res.json(matchingEmployees[0])
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;