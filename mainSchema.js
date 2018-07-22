module.exports = function(mongoose) {
    let MainSchema = new mongoose.Schema( {
        img: { type: String, default: '../img/no_image.png' },
        name: { type: String, default: 'Наименование' },
        text: { type: String, default: 'Текст' },
        nameBut: { type: String, default: 'Кнопка' },
        hrefBut: {type: String, default: '#'},
    } );

    let UserSchema = new mongoose.Schema( {
        name: { type: String, default: 'admin' },
        password: { type: String, default: 'admin123' },
    } );


    let models = {
        MainModel: mongoose.model('mains', MainSchema),
        UserModel: mongoose.model('users', UserSchema),
    };
    return models;
};


