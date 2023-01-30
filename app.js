const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  const day = date.getDate();

  res.render('list', { listTitle: day, newListItems: items });
});

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work', newListItems: workItems });
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.post('/', function (req, res) {
  if (req.body.list === 'Work') {
    workItems.push(req.body.newItem);
    res.redirect('/work');
  } else {
    items.push(req.body.newItem);
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server running');
});
