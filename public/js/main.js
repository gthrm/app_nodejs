let username = document.getElementById('username');
let theDate = document.getElementById('theDate');
let tel = document.getElementById('tel');
let inst = document.getElementById('inst');
let message = document.getElementById('message');
let send = document.getElementById('send');
let write = document.getElementById('write');

$(function(){
    //2. Получить элемент, к которому необходимо добавить маску
    $("#tel").mask("+7 (999) 999-99-99");
  });

window.onload = function(){
    if (window.screen.availWidth < 768) {
        console.log(window.screen.availWidth);
        let elem = document.getElementById('vk').parentElement;
        let elemDel = document.getElementById('vk');
        elem.removeChild(elemDel);
        
    };
};
username.oninput = function(){
    if (username.value !== "") {
        username.setAttribute("style", "text-transform: uppercase;");
    } else {
        username.setAttribute("style", "")
    };
};

theDate.oninput = function(){
    if (theDate.value !== "") {
        theDate.setAttribute("style", "text-transform: uppercase;");
    } else {
        theDate.setAttribute("style", "")
    };
};

tel.oninput = function(){
    if (tel.value !== "") {
        tel.setAttribute("style", "text-transform: uppercase;");
    } else {
        tel.setAttribute("style", "")
    };
};

inst.oninput = function(){
    if (inst.value !== "") {
        inst.setAttribute("style", "text-transform: uppercase;");
    } else {
        inst.setAttribute("style", "")
    };
};

send.onclick = function send() {

    if (username.value === "" || tel.value === "" || inst.value === "" || tel.value.length < 9) {  
        swal ( "Ой" ,  "Ты заполнил не все поля! :)" ,  "error" );
        return false;

    } else {
        let captcha = grecaptcha.getResponse();
        if (captcha.length == ""){
            // alert('Пройдите капчу!');
            swal ( "Ой" ,  "Ты не робот? Пройди капчу! ;)" ,  "error" );
            return false;
        }
        let xhr = new XMLHttpRequest();

        let body = JSON.stringify({ 'capcha': captcha }) ; //,
        
        xhr.open("POST", '/capcha', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = function(){
            if (xhr.response == 'true') {
                sendData(xhr.response);
                console.log('А сейчас');
                xhr.abort();
                swal ( "Спасибо!" ,  "Данные отправлены, скоро с Вами свяжется мастер ;)" ,  "success" );
                username.value = '';
                tel.value = '';
                inst.value = '';
                message.value = '';
                scrollTo(top);
                setTimeout(() => {
                    location.reload();
                }, 3000);
                return false;
            } else {
                console.log('Не сейчас');
            }
            
        };
        
        xhr.send(body);
        return false;
    };

};

function sendData(param){
    console.log('Тип param '+typeof param, 'Значение '+param);
    if (param == 'true'){
        let HttpRequest = new XMLHttpRequest();
        let bodyReq = JSON.stringify( {'username': username.value, 'theDate': theDate.value, 'tel': tel.value, 'inst': inst.value, 'message': message.value} );
        HttpRequest.open('POST', '/data', true);
        HttpRequest.setRequestHeader('Content-Type', 'application/json');

        HttpRequest.onreadystatechange = function(){
            console.log(HttpRequest.response);
        };

        HttpRequest.send(bodyReq);

        
    } else {
        console.log('что-то не так');
    };
};


write.onclick = function(){
    setFocus('username');
    return false;
};

function setFocus(param){
    document.getElementById(''+param+'').focus();
    return false;
}