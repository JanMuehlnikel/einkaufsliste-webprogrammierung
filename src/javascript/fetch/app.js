const express = require('express');
const app = express();
const path = require('path');

let users = [
    {
        userID: "user1", prename: "Jan", name: "Mühlnikel", email: "jan.muehlnikel@gmx.de", password: "jan2001",
        items: [{ itemID: "1", item: "Apfel", quantity: "4", unit: "Stück", responsible: "Jan", ticked: false }]
    },
    {
        userID: "user2", prename: "Franziska", name: "Marb", email: "franziska.marb@gmx.de", password: "pw123",
        items: [{ itemID: "1", item: "Banan", quantity: "4", unit: "Stück", responsible: "Franziska", ticked: false }]
    },
]

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});

// POST REGISTER
app.post("/api/register", (req, res) => {
    let existendEmail = false

    // check if email exists in users array
    for (var i = 0; i < users.length; i++) {
        if (users[i]['email'] == req.query.email) {
            existendEmail = true
        }
    }
    if (existendEmail) {
        res.send({ message: "Diese Email Adresse existiert bereits!" })
    } else {
        // push new user in users
        users.push({
            userID: req.query.userID,
            prename: req.query.prename,
            name: req.query.name,
            email: req.query.email,
            password: req.query.password,
            items: []
        })
        res.status(200).json({ message: "success" })
    }
})

// POST LOGIN
app.post("/api/login", (req, res) => {
    try {
        userEmail = users.find(u => u.email == req.query.email)["email"]
        userPassword = users.find(u => u.password == req.query.password)["password"]
        userID = users.find(u => u.email == req.query.email)["userID"]

        res.send({ auth: userID })

    } catch (error) {
        console.error(error)
        res.send({ auth: "error" })
    }
})

// POST ITEMS
app.post("/api/users/items", (req, res) => {

    const item_array = users.find(u => u.userID == req.query.userID)["items"]

    item_array.push({
        itemID: "item:" + (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2), //unique itemID with time + random number
        item: req.query.item,
        quantity: req.query.quantity,
        unit: req.query.unit,
        responsible: req.query.responsible,
        ticked: req.query.ticked
    })
    res.send(200)
})

// POST TICKED ITEM
app.post("/api/users/items/ticked", (req, res) => {
    userID = req.query.userID
    itemID = req.query.itemID
    ticked = req.query.ticked

    const item_array = users.find(u => u.userID == userID)["items"]
    const item = item_array.find(i => i.itemID == itemID)

    if (item) {
        // filter out the item id and create new array without the id
        users.find(u => u.userID == userID)['items'].find(u => u.itemID == itemID)['ticked'] = "true"

        res.status(200).json(item)
    } else {
        res.status(404).json({ message: + " ID" + itemID + " was not found!" })
    }

    res.send(200)
})

// DELETE ITEM
app.delete('/api/users/items/:UserIDItemID', (req, res) => {
    const { UserIDItemID } = req.params

    userID = UserIDItemID.split("@")[0]
    itemID = UserIDItemID.split("@")[1]

    // check if item is in array
    const item_array = users.find(u => u.userID == userID)["items"]
    const deleted = item_array.find(i => i.itemID == itemID)

    if (deleted) {
        // filter out the deleted id and create new array without the id
        users.find(u => u.userID == userID)['items'] = item_array.filter(i => i.itemID != itemID)
        res.status(200).json(deleted)
    } else {
        res.status(404).json({ message: + " ID" + itemID + " was not found!" })
    }
})

// GET
app.get('/api/users', (req, res) => res.json(users));
app.get('/api/user/items/:userID', (req, res) => {
    const item_array = users.find(u => u.userID == req.params.userID)["items"]

    res.json(item_array)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

module.exports = app;