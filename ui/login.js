$(document).ready(function(){

    var loginbtn = $('#login');
    var logoutbtn = $('#logout');

    //Login Request
    loginbtn.on('click',function(){
        var regno = $('#regno').val();
        var login = new XMLHttpRequest();
        login.onload = function(){
            if(login.readyState = XMLHttpRequest.DONE){
                if(login.status===200){
                    if(regno.slice(0,2) != 'WR'){
                        window.location.href = "http://localhost:8085/ui/dashboard.html";
                    }else{
                        window.location.href = "http://localhost:8085/ui/dashboard-wr.html";
                    }
                }else{
                    $('#message').html('Invalid Credentials');
                }
            }
        }
        var regno = $('#regno').val();
        var password = $('#password').val();
            login.open('POST', 'http://localhost:8085/login', true);
            login.setRequestHeader('Content-Type', 'application/json');
            login.send(JSON.stringify({regno: regno, password: password}));
    });

//Logout Request
    logoutbtn.on('click',function(){
        var logout = new XMLHttpRequest();
        logout.onload = function(){
            if(logout.readyState = XMLHttpRequest.DONE){
                if(logout.status===200){
                    window.location.href = "http://localhost:8085/ui/logout.html";
                }else{
                    $('#message').html(logout.responseText);
                }
            }
        }
        logout.open('GET','http://localhost:8085/logout',true);
        logout.send(null);
    });
});

