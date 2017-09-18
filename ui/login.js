$(document).ready(function(){
    console.log('login');
    var submit = $('#login');
    submit.on('click',function(){
        var login = new XMLHttpRequest();
        login.onload = function(){
            if(login.readyState = XMLHttpRequest.DONE){
                if(login.status===200){
                    $('#message').html(login.responseText);
                }else{
                    $('#message').html(login.responseText);
                }
            }
        }
        var regno = $('#regno').val();
        var password = $('#password').val();
        console.log(regno,password);
        login.open('POST', 'http://localhost:8085/login', true);
        login.setRequestHeader('Content-Type', 'application/json');
        login.send(JSON.stringify({regno: regno, password: password}));
    });
});