let now = new Date();

module.exports = function(mongoose) {
    let MainSchema = new mongoose.Schema( {
        img: { type: String, default: '../img/no_image.png' },
        name: { type: String, default: 'Наименование' },
        text: { type: String, default: 'Текст' },
        nameBut: { type: String, default: 'Записаться' },
        hrefBut: {type: String, default: '#'},
    } );

    let UserSchema = new mongoose.Schema( {
        name: { type: String, default: 'admin' },
        password: { type: String, default: 'admin123' },
    } );

    let ClientSchema = new mongoose.Schema( {
        aDate: { type: String, default: now},
        username: { type: String, default: 'client' },
        theDate: { type: String },
        tel: { type: String, default: 'tel' },
        inst: { type: String, default: 'inst' },
        message: { type: String, default: 'Комментарий' },
    } );

    let IpSchema = new mongoose.Schema( {
        IP: { type: String, default: 'IP' },
        aDate: { type: String, default: now},
    } );


    let models = {
        MainModel: mongoose.model('mains', MainSchema),
        UserModel: mongoose.model('users', UserSchema),
        ClientModel: mongoose.model('clients', ClientSchema),
        IpModel: mongoose.model('ips', IpSchema)
    };
    return models;
};


