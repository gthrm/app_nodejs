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

        
            let formData = new FormData(document.forms.person);

            // добавить к пересылке ещё пару ключ - значение
            // formData.append("captcha", captcha);
            
            // отослать
            let req = new XMLHttpRequest();
            req.open("POST", "/data", true);
            req.send(formData);
            req.onreadystatechange = function(){
                console.log(req.responseText);
            
        };
    };
};