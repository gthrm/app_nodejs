const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));    


app.get ('/', function(req, res){
    let data;
    res.render('index.ejs', {data: data})
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Сервер запущен на порту '+app.get('port'));
});