$(document).ready(function(){

var profilebtn = $("#student-details-tab");
var messbtn = $("#mess-details-tab");
var hostelroombtn = $("#hostel-room-details-tab");
var attendancebtn = $("#attendance-tab");

//Get User details
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
    $("#student-details").css('display','inline');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','none');
});

messbtn.on('click',function(){
    $("#student-details").css('display','none');
    $("#mess-details").css('display','inline');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','none');
});

hostelroombtn.on('click',function(){
    $("#student-details").css('display','none');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','inline');
    $("#attendance").css('display','none');
});

attendancebtn.on('click',function(){
    $("#student-details").css('display','none');
    $("#mess-details").css('display','none');
    $("#hostel-room-details").css('display','none');
    $("#attendance").css('display','inline');
});

$("#edit").on("click",function(){
    $("#student-details").css("display","none");
    $("#add-student-d").css("display","inline");
});

});