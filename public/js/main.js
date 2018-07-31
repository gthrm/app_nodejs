let username = document.getElementById('username');
let theDate = document.getElementById('theDate');
let tel = document.getElementById('tel');
let inst = document.getElementById('inst');
let message = document.getElementById('message');



send.onclick = function send() {
    

    if (username.value === "" || tel.value === "" || inst.value === "") {  
        swal ( "Ой" ,  "Ты заполнил не все поля! :)" ,  "error" );
        return false;

    } else {
        let captcha = grecaptcha.getResponse();
        // if (captcha.length == ""){
        //     // alert('Пройдите капчу!');
        //     swal ( "Ой" ,  "Ты не робот? Пройди капчу! ;)" ,  "error" );
        //     return false;
        // }
        let xhr = new XMLHttpRequest();

        let body = JSON.stringify({ 'capcha': captcha }) ; //'username': username.value, 'theDate': theDate.value, 'tel': tel, 'inst': inst, 'message': message,
        
        xhr.open("POST", '/capcha', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = function(){
            console.log(xhr.response);
        };
        
        xhr.send(body);
    };
};