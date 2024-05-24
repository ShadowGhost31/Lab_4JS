const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Дозволяємо розкодування JSON
app.use(bodyParser.json());

// Мокап даних користувачів і завдань (замініть це на реальну базу даних)
let users = [];
let tasks = [];

// Маршрути для користувачів
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Користувач не знайдений');
    res.json(user);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send('Користувач створений успішно');
});

app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = req.body;
    users = users.map(user => {
        if (user.id === id) {
            return { ...user, ...updatedUser };
        }
        return user;
    });
    res.send('Користувач оновлений успішно');
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.send('Користувач видалений успішно');
});

// Маршрути для завдань
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Додайте інші маршрути для завдань (GET, POST, PATCH, DELETE)

// Прослуховування порту
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});
