$(document).ready(function(){

var profilebtn = $("#student-details-tab");
var messbtn = $("#mess-details-tab");
var hostelroombtn = $("#hostel-room-details-tab");
var attendancebtn = $("#attendance-tab");
var leaveApplication = $("#leave-application-tab");

//Get User details
function getStudent(){
    var student = new XMLHttpRequest();
    student.onload = function(){
        if(student.readyState = XMLHttpRequest.DONE){
            if(student.status===200){
                data = JSON.parse(student.responseText);
                $("#name").html(data.name);
                $("#regno").html(data.regno);
                $("#dob").html(data.dob);
                $("#email").html(data.emailid);
                $("#contact").html(data.phone);
                $("#stream").html(data.stream);
                $("#father-name").html(data.father_name);
                $("#mother-name").html(data.mother_name);
                $("#parent-contact").html(data.parent_phone);
                $("#address").html(data.address);
                $("#parent-email").html(data.email);
                $("#proctor-name").html(data.proctor_name);
                $("#proctor-email").html(data.proctor_email);
                $("#proctor-contact").html(data.proctor_phone);
                $("#room-no").html(data.room_no);
                $("#hostel-block").html(data.hostel_block);
                $("#room-type").html(data.room_id);
                $("#mess-type").html(data.mess_id);
            }else{
                $("#student-details").html(student.responseText);
            }
        }
    }
    student.open('GET','http://localhost:8085/get-user',true);
    student.send(null);    
}

getStudent();
setTimeout(getRoom,500);
setTimeout(getMess,500);

//Get Room Function
function getRoom(){
    var room = new XMLHttpRequest();
    room.onload = function(){
        if(room.readyState = XMLHttpRequest.DONE){
            if(room.status===200){
                data = JSON.parse(room.responseText);
                $("#room-type").html(data.room_type);
                if(data.ac == 1){
                    $("#room-type").append(', Air Conditioned.');
                }else{
                    $("#room-type").append(', Non Air Conditioned.');
                }
    
            }else{
                $('#hostel-room').html(room.responseText);
            }
        }
    }
    var room_id = $("#room-type").html();
    room.open('GET','http://localhost:8085/get-room/'+room_id,true);
    room.send(null);
}
//Get Room Function
function getMess(){
    var mess = new XMLHttpRequest();
    mess.onload = function(){
        if(mess.readyState = XMLHttpRequest.DONE){
            if(mess.status===200){
                data = JSON.parse(mess.responseText);
                $("#mess-type").html(data.type);
            }else{
                $('#mess-details-table').html(mess.responseText);
            }
        }
    }
    var mess_id = $("#mess-type").html();
    mess.open('GET','http://localhost:8085/get-mess/'+mess_id,true);
    mess.send(null);
}

//Styling
profilebtn.on('click',function(){
    $("#add-student-d").css('display','none');
    $("#leave-application").css('display','none');
    $("#student-details").css('display','inline');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','none');
});

messbtn.on('click',function(){
    $("#add-student-d").css('display','none');
    $("#leave-application").css('display','none');
    $("#student-details").css('display','none');
    $("#mess-details").css('display','inline');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','none');
});

hostelroombtn.on('click',function(){
    $("#add-student-d").css('display','none');
    $("#leave-application").css('display','none');
    $("#student-details").css('display','none');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','inline');
    $("#attendance").css('display','none');
});

attendancebtn.on('click',function(){
    $("#add-student-d").css('display','none');
    $("#leave-application").css('display','none');
    $("#student-details").css('display','none');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','inline');
});

leaveApplication.on('click',function(){
    $("#add-student-d").css('display','none');
    $("#leave-application").css('display','inline');
    $("#student-details").css('display','none');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','none');
});



$("#edit").on("click",function(){
    $("#student-details").css("display","none");
    $("#add-student-d").css("display","inline");
});

$("#cross").on('click',function(){
    $("#student-details").css("display","inline");
    $("#add-student-d").css("display","none");
});

var notification = document.querySelector('.mdl-js-snackbar');

$("#send-student-details").on('click',function(){
    var father_name = $("#fathers-name").val().trim();
    var mother_name = $("#mothers-name").val().trim();
    var email = $("#p-email").val().trim();
    var phone = $("#p-contact").val().trim();
    var address = $("#p-address").val().trim();
    var up = new XMLHttpRequest();
    up.onload = function(){
        if(up.readyState = XMLHttpRequest.DONE){
            if(up.status===200){
                getStudent();
                $("#student-details").css("display","inline");
                $("#add-student-d").css("display","none");
                var data = {
                    message: 'Your parent\'s details were updated! :)',
                    actionHandler: function(event) {},
                    actionText: 'HMS',
                    timeout: 10000
                  };
                  notification.MaterialSnackbar.showSnackbar(data);
            }else{
                console.log("not done");
                var data = {
                    message: 'Fill in the details properly! :(',
                    actionHandler: function(event) {},
                    actionText: 'HMS',
                    timeout: 10000
                  };
                  notification.MaterialSnackbar.showSnackbar(data);
            }
        }
    }
        up.open('POST', 'http://localhost:8085/up', true);
        up.setRequestHeader('Content-Type', 'application/json');
        up.send(JSON.stringify({father_name:father_name, mother_name: mother_name, phone: phone, email: email, address: address}));
    });

        //Broadcast Message
        var bmr = new XMLHttpRequest();
            bmr.onload = function(){
                if(bmr.readyState = XMLHttpRequest.DONE){
                    if(bmr.status===200){
                        var data = JSON.parse(bmr.responseText);
                        for(i=0;i<data.length;i++){
                            var time = new Date(data[i].time);
                            var dd = time.getDate();
                            var mm = time.getMonth() + 1;
                            var yyyy = time.getFullYear();
                            var date = dd+'/'+mm+'/'+yyyy;
                            var mdiv = '<div class="bm"><div class = "w-name" style="font-weight: bold; font-size: 16px">'+data[i].name+'</div><div class = "w-time" style="font-size: 9px">'+date+'</div><br><div class = "w-message">'+data[i].message+'</div></div><hr>';
                            $("#attendance").append(mdiv);
                        }
                        
                    }else{
                        $('#message').html(logout.responseText);
                    }
                }
            }
            bmr.open('GET','http://localhost:8085/broadcast',true);
            bmr.send(null);
        


    $("#send-student-details-1").on('click',function(){
        var us = new XMLHttpRequest();
        us.onload = function(){
            if(us.readyState = XMLHttpRequest.DONE){
                if(us.status===200){
                    getStudent();
                    $("#student-details").css("display","inline");
                    $("#add-student-d").css("display","none");
                    var data = {
                        message: 'Your details were updated! :)',
                        actionHandler: function(event) {},
                        actionText: 'HMS',
                        timeout: 10000
                      };
                      notification.MaterialSnackbar.showSnackbar(data);
                }else{
                    console.log("not done");
                    var data = {
                        message: 'Fill in the details properly! :(',
                        actionHandler: function(event) {},
                        actionText: 'HMS',
                        timeout: 10000
                      };
                      notification.MaterialSnackbar.showSnackbar(data);
                }
            }
        }
        var emailid = $("#email-s").val().trim();
        var phone = $("#contact-s").val().trim();
        us.open('POST', 'http://localhost:8085/us', true);
        us.setRequestHeader('Content-Type', 'application/json');
        us.send(JSON.stringify({emailid: emailid, phone: phone}));
    });

    $("#leave-request").on("click",function(){
      var place = $("#place").val();
      var time1 = $("#outtime").val();
      var time2 = $("#intime").val();
      var t1 = new Date(time1);
      var t2 = new Date(time2);

      //time in milliseconds
      var outtime = t1.getTime();
      var intime = t2.getTime();
      
      var leaveReq = new XMLHttpRequest();
      leaveReq.onload = function(){
        if(leaveReq.readyState = XMLHttpRequest.DONE){
            if(leaveReq.status===200){
                var data = {
                    message: 'Your leave application has been submitted. Wait for the warden to process your application! :)',
                    actionHandler: function(event) {},
                    actionText: 'HMS',
                    timeout: 10000
                  };
                  notification.MaterialSnackbar.showSnackbar(data);
            }else{
               // $('#message').html('Invalid Credentials');
            }
        }
    }
        leaveReq.open('POST', 'http://localhost:8085/leave', true);
        leaveReq.setRequestHeader('Content-Type', 'application/json');
        leaveReq.send(JSON.stringify({intime:intime,outtime:outtime,place: place}));
    });

});