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

let now = new Date();
let password;

app.use( bodyParser.urlencoded( {extended: true } ) );
app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, 'public')));    


app.get ('/', function(req, res){
    mongoose.connect(dbSite);

    models.MainModel.find(function(err, data){
        if (err) throw err;
        console.log(data.length); //количество записей
        res.render('index.ejs', {data: data});
    });
    
});

app.post ('/capcha', function(req, res){

    let capcha = req.body.capcha; // капча

    //*** */
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const secret = '6LdgXWcUAAAAAAFhwAaJWKKFKT2ttcaEaMXqFwxB';
    let answer = '';
    let gRecaptchaResponse = capcha;
    request({
       method: 'POST',
       url: url,
       qs: {
            secret: secret, 
            response: gRecaptchaResponse 
       }
      }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
        // console.log(typeof body);
        answer = JSON.parse(body);
        // console.log('*******************');
        // console.log(typeof answer);
        // console.log(answer.success);
        // console.log('*******************');
        // валидация и 
        // обработка полученного ответа, заголовков
        res.send(answer.success);
      }
    });
    //*** */

    
});

app.post('/data', function(req, res){
    let username = req.body.username;
    let theDate = req.body.theDate;
    let tel = req.body.tel;
    let inst = req.body.inst;
    let message = req.body.message;

    console.log(username, theDate, tel, inst, message);

    mongoose.connect(dbSite, function(err, noerr){
        if (err) throw err;
        let newClient = new models.ClientModel ({
            username: username,
            theDate: theDate,
            tel: tel,
            inst: inst,
            message: message,
        });
        newClient.save(function(err, newClient){
            if (err) {
                console.log("Что-то не так с документом " + newClient.username);
            } else {
                console.log(newClient.username + ' сохранен.');
            };
            sendClientData();
        });
        function sendClientData(){
            models.ClientModel.find(function(err, data){
                if (err) throw err;
                let transporter = nodemailer.createTransport( {
                    host: 'smtp.rambler.ru',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'andywiller@rambler.ru',
                        pass: password,
                    }
                } );
        
                let actualClient = data.length - 1;
        
                let mailOption = {
                    from: 'andywiller@rambler.ru',
                    to: 'mrv24ru@yandex.ru',
                    subject: 'Новый клиент',
                    text: 'Имя: ' + data[actualClient].username + '; Телефон: ' + data[actualClient].tel + '; Дата: ' + data[actualClient].theDate + '; Ссылка: ' + data[actualClient].inst + '; Комментарий: ' + data[actualClient].message,
                };
        
                transporter.sendMail(mailOption, function (err, info){
                    if (err) throw err;
                    console.log('Email отправлен в ' + now + ' ;' + info.response);
                });
            });
        };



    });
    res.send('Данные получены: ' + username+' '+ theDate+' ' + tel + ' '+ inst + ' '+ message);
});

//Создание пользователя
// app.get('/userCreate', function(req, res){
//     mongoose.connect(dbSite, function(err, noerr){
//         if (err) throw err;
//         let newUser = new models.UserModel ({
//         });
//         newUser.save(function(err, newUser){
//             if (err) {
//                 console.log("Что-то не так с документом " + newUser.name);
//             } else {
//                 console.log(newUser.name + ' сохранен.');
//                 res.send(newUser.name +' сохранен.');
//             }
//         });
//     });
// });
//


app.get('/user', function(req, res){
    res.render( 'user.ejs' );
});

app.post('/user', function(req, res){
    let username = req.body.username;
    let password = req.body.password;

    mongoose.connect(dbSite, function(err, noerr){
        if (err) throw err;
        models.UserModel.find(function(err, data){
            if (err) throw err;
            if (username == data[0].name && password == data[0].password) {
                res.render('postmain.ejs', {name: data[0].name});
            } else {
                res.send('не верный логин или пароль');
                return;
            }
        });

    });
});

app.post('/write', function(req, res){
    let img = req.body.img;
    let name = req.body.name;
    let text = req.body.text;
    let nameBut = req.body.nameBut;
    let hrefBut = req.body.hrefBut;

    mongoose.connect(dbSite, function(err, noerr){
        if (err) throw err;
        let newMain = new models.MainModel ({
            img: img,
            name: name,
            text: text,
            nameBut: nameBut,
            hrefBut: hrefBut,
        });
        newMain.save(function(err, newMain){
            if (err) {
                console.log("Что-то не так с документом " + newMain.name);
            } else {
                console.log(newMain.name + ' сохранен.');
                res.send(newMain.name +' сохранен.');
            }
        });
    });
});

// app.get ('/write', function(req, res){

//     mongoose.connect(dbSite, function(err, noerr){
//         if (err) throw err;
//         let newMain = new models.MainModel ({
//             img: '../img/no_image.png',
//             name: 'Наименование',
//             text: 'Текст',
//             nameBut: 'Кнопка',
//         });
//         newMain.save(function(err, newMain){
//             if (err) {
//                 console.log("Что-то не так с документом " + newMain.name);
//             } else {
//                 console.log(newMain.name + ' сохранен.');
//                 res.send(newMain.name +' сохранен.');
//             }
//         });
//     });
  
    
// });

setTimeout(() => {
    read({ prompt : 'Enter Password: ' }, function (err, pass) {
        if (err) throw err;
        // console.log(pass);
        password = pass;
        process.stdin.destroy();
    });
}, 2000);

app.set('port', (process.env.PORT || 80));
app.listen(app.get('port'), function() {
    console.log('Сервер запущен на порту '+app.get('port'));
});