const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const models = require('./mainSchema')(mongoose);
const bodyParser = require('body-parser');

app.use( bodyParser.urlencoded( {extended: true } ) );
app.use( bodyParser.json() );

app.use(express.static(path.join(__dirname, 'public')));    


app.get ('/', function(req, res){
    mongoose.connect('mongodb://adminuser:admin123@ds247191.mlab.com:47191/nail');

    models.MainModel.find(function(err, data){
        if (err) throw err;
        // console.log(data);
        res.render('index.ejs', {data: data});
    });
    
});

//Создание пользователя
// app.get('/userCreate', function(req, res){
//     mongoose.connect('mongodb://adminuser:admin123@ds247191.mlab.com:47191/nail', function(err, noerr){
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

    mongoose.connect('mongodb://adminuser:admin123@ds247191.mlab.com:47191/nail', function(err, noerr){
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

    mongoose.connect('mongodb://adminuser:admin123@ds247191.mlab.com:47191/nail', function(err, noerr){
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

//     mongoose.connect('mongodb://adminuser:admin123@ds247191.mlab.com:47191/nail', function(err, noerr){
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

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Сервер запущен на порту '+app.get('port'));
});