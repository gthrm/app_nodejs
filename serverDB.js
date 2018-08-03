const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const models = require('./mainSchema')(mongoose);
const bodyParser = require('body-parser');
const dbSite = 'mongodb://adminuser:admin123@ds247191.mlab.com:47191/nail';
const request = require('request');
const nodemailer = require('nodemailer');
const read = require('read');

let password;
let dataLength = 0;

setTimeout(() => {
    read({ prompt : 'Password: ' }, function (err, pass) {
        if (err) throw err;
        // console.log(pass);
        password = pass;
        process.stdin.destroy();
        // console.log('Пароль: ' + password);
        go();
    });
}, 2000);

    


function go() {
    mongoose.connect(dbSite);
    models.ClientModel.find(function(err, data){
        if (err) throw err;
        // console.log(data.length); //количество записей
        dataLength = data.length;
    });

    setTimeout(() => {
        mongoose.connect(dbSite);
    
        models.ClientModel.find(function(err, data){
            if (err) throw err;
            // console.log(data.length); //количество записей
            if (data.length > dataLength) {
                // console.log(data);
                // for (i = 0; i < data.length; i ++)
                let transporter = nodemailer.createTransport( {
                    host: 'smtp.rambler.ru',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'sendsender@ro.ru',
                        pass: password,
                    }
                } );

                let actualClient = data.length - 1;

                let mailOption = {
                    from: 'sendsender@ro.ru',
                    to: 'sendsender@ro.ru',
                    subject: 'Новый клиент',
                    text: 'Имя ' + data[actualClient].username + '; телефон: ' + data[actualClient].tel + '; вк или инст: ' + data[actualClient].inst + '; комментарий: ' + data[actualClient].message,
                };

                transporter.sendMail(mailOption, function (err, info){
                    if (err) throw err;
                    console.log('Email отправлен ' + info.response);
                });

            } else {
                // console.log("Ничего нового.");
            };
           
        });
        go();
    }, 300000);
};

app.use( bodyParser.urlencoded( {extended: true } ) );
app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, 'public'))); 



app.set('port', (process.env.PORT || 3333));
app.listen(app.get('port'), function() {
    console.log('Сервер для записей запущен на порту '+app.get('port'));
});