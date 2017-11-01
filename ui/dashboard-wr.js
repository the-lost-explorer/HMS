$(document).ready(function(){
    var notification = document.querySelector('.mdl-js-snackbar');
    var searchbtn = $("#search-student-tab");
    var broadcastbtn = $("#broadcast-tab");
    var addbtn = $("#add-student-tab");
    var approvalbtn = $("#approval-tab");
    
    //Get User details
    $("#search").on('click',function(){
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
                    $("#student-search").css('display','none');
                    $("#student-details-wr").css('display','inline');
                }else{
                    $("#student-details-wr").html(student.responseText);
                }
            }
        }
        var regno = $("#regno-search").val().trim();
        student.open('GET','http://localhost:8085/get-userwr/'+regno,true);
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
    });
    
    //Styling
    searchbtn.on('click',function(){
        $("#student-details-wr").css('display','none');
        $("#student-search").css('display','inline');
        $("#broadcast").css('display','none');
        $("#add-student").css('display','none');
        $("#approval").css('display','none');
    });
    
    broadcastbtn.on('click',function(){
        $("#student-details-wr").css('display','none');
        $("#student-search").css('display','none');
        $("#broadcast").css('display','inline');
        $("#add-student").css('display','none');
        $("#approval").css('display','none');
    });
    
    addbtn.on('click',function(){
        $("#student-details-wr").css('display','none');
        $("#student-search").css('display','none');
        $("#broadcast").css('display','none');
        $("#add-student").css('display','inline');
        $("#approval").css('display','none');
    });
    
    approvalbtn.on('click',function(){
        $("#student-details-wr").css('display','none');
        $("#student-search").css('display','none');
        $("#broadcast").css('display','none');
        $("#add-student").css('display','none');
        $("#approval").css('display','inline');
    });
    
    $("#send").on('click',function(){
            var message = $('#broadcast-message').val();
            var bm = new XMLHttpRequest();
            bm.onload = function(){
                if(bm.readyState = XMLHttpRequest.DONE){
                    if(bm.status===200){
                        var data = {
                            message: 'Message sent to all students! :)',
                            actionHandler: function(event) {},
                            actionText: 'HMS',
                            timeout: 10000
                          };
                          notification.MaterialSnackbar.showSnackbar(data);
                    }else{
                        var data = {
                            message: 'Try again, some error occurred! :)',
                            actionHandler: function(event) {},
                            actionText: 'HMS',
                            timeout: 10000
                          };
                          notification.MaterialSnackbar.showSnackbar(data);
                    }
                }
            }
                bm.open('POST', 'http://localhost:8085/bm', true);
                bm.setRequestHeader('Content-Type', 'application/json');
                bm.send(JSON.stringify({message:message}));
    });

    $("#special-mess").on("click",function(){
        $("#mess-t").html('SPECIAL MESS');
        $("#food").css("display","none");
        $("#demo-menu-lower-left-food").css("display","none");
    });

    $("#north-mess").on("click",function(){
        $("#mess-t").html('NORTH MESS');
        $("#food").css("display","inline");
        $("#demo-menu-lower-left-food").css("display","inline");
    });

    $("#south-mess").on("click",function(){
        $("#mess-t").html('SOUTH MESS');
        $("#food").css("display","inline");
        $("#demo-menu-lower-left-food").css("display","inline");
    });

    $("#vegetarian").on("click",function(){
        $("#food").html('VEGETARIAN');
    });

    $("#non-vegetarian").on("click",function(){
        $("#food").html('NON VEGETARIAN');
    });

    $("#aco").on("click",function(){
        $("#ac").html('AIR CONDITIONED');
    });

    $("#naco").on("click",function(){
        $("#ac").html('NON AIR CONDITIONED');
    });

    $("#4b").on("click",function(){
        $("#bed").html('4 BEDDED');
    });

    $("#3b").on("click",function(){
        $("#bed").html('3 BEDDED');
    });

    $("#2b").on("click",function(){
        $("#bed").html('2 BEDDED');
    });

    $("#adds").on("click",function(){
        var messid = 0;
        var roomid = 0;
        var mt = $("#mess-t").html().trim();
        var ft = $("#food").html().trim();
        var ac = $("#ac").html().trim();
        var bed = $("#bed").html().trim();
        console.log(mt,ft,ac,bed);
        //MESS ID RETRIVAL
        if(mt == "SPECIAL MESS"){
            messid = 5;
        }else if(mt == "NORTH MESS" && ft == "VEGETARIAN"){
            messid = 1;
        }else if(mt == "NORTH MESS" && ft == "NON VEGETARIAN"){
            messid = 2;
        }else if(mt == "SOUTH MESS" && ft == "VEGETARIAN"){
            messid = 3;
        }else if(mt == "SOUTH MESS" && ft == "NON VEGETARIAN"){
            messid = 4;
        }

        //ROOM ID RETRIVAL
        if(ac == "NON AIR CONDITIONED"&& bed == "2 BEDDED"){
            roomid = 1;
        }else if(ac == "AIR CONDITIONED"&& bed == "2 BEDDED"){
            roomid = 2;
        }else if(ac == "NON AIR CONDITIONED"&& bed == "3 BEDDED"){
            roomid = 3;
        }else if(ac == "AIR CONDITIONED"&& bed == "3 BEDDED"){
            roomid = 4;
        }else if(ac == "NON AIR CONDITIONED"&& bed == "4 BEDDED"){
            roomid = 5;
        }else if(ac == "AIR CONDITIONED"&& bed == "4 BEDDED"){
            roomid = 6;
        }

        var hmr = new XMLHttpRequest();
        hmr.onload = function(){
            if(hmr.readyState = XMLHttpRequest.DONE){
                if(hmr.status===200){
                    console.log("Successful!")
                    var data = {
                        message: 'Details changed! :)',
                        actionHandler: function(event) {},
                        actionText: 'HMS',
                        timeout: 10000
                      };
                      notification.MaterialSnackbar.showSnackbar(data);
                }else{
                    var data = {
                        message: 'Fill in the details again! :(',
                        actionHandler: function(event) {},
                        actionText: 'HMS',
                        timeout: 10000
                      };
                      notification.MaterialSnackbar.showSnackbar(data);
                }
            }
        }
        var regno = $("#regno-hmr").val();
        var hb = $("#block").val();
        var roomno = $("#roomno").val();
        hmr.open('POST', 'http://localhost:8085/mhr', true);
        hmr.setRequestHeader('Content-Type', 'application/json');
        hmr.send(JSON.stringify({regno:regno,roomid:roomid,messid:messid,hb:hb,roomno:roomno}));
        console.log(roomid,messid,roomno,regno,hb);
    });

    //Get Approval
        var bmr = new XMLHttpRequest();
            bmr.onload = function(){
                if(bmr.readyState = XMLHttpRequest.DONE){
                    if(bmr.status===200){
                        var data = JSON.parse(bmr.responseText);
                        console.log(data);
                        for(i=0;i<data.length;i++){
                            var approval = data[i].approval;
                            console.log(approval);
                            var intime = new Date(parseInt(data[i].in_time,10));
                            var outtime = new Date(parseInt(data[i].out_time));
                            ddi = intime.getDate();
                            mmi = intime.getMonth() + 1;
                            yyyyi = intime.getFullYear();
                            hhi = intime.getHours();
                            mimi = intime.getMinutes();
                            in_time = ddi+"/"+mmi+"/"+yyyyi+" "+hhi+": "+mimi;

                            hho = outtime.getHours();
                            mimo = outtime.getMinutes();
                            ddo = outtime.getDate();
                            mmo = outtime.getMonth() + 1;
                            yyyyo = outtime.getFullYear();
                            out_time = ddo+"/"+mmo+"/"+yyyyo+" "+hho+": "+mimo;
                            var mdiv = '<tr class="leave-approval-row"><td class="leave-id">'+data[i].id+'</td><td class = "regno-leave" >'+data[i].regno+'</td><td class = "out_time-leave">'+out_time+'</td><td class = "in_time-leave">'+in_time+'</td><td class="approval"><button class="la" id='+data[i].id+'>Approve</button></td></tr>';
                            if(approval == false){
                                $("#approval").append(mdiv);
                                $(".leave-id").css('display','none');
                                $(".regno-leave").css('padding-right','50');
                                $(".out_time-leave").css('padding-right','50');
                                $(".in_time-leave").css('padding-right','50');
                            }
                           

                            $(".la").on('click',function(){
                                console.log('hello');
                                var la = new XMLHttpRequest();
                                la.onload = function(){
                                    if(la.readyState = XMLHttpRequest.DONE){
                                        if(la.status===200){
                                           $('.approval').html('Approved!');
                                           var data = {
                                            message: 'Approved! :)',
                                            actionHandler: function(event) {},
                                            actionText: 'HMS',
                                            timeout: 100
                                          };
                                          notification.MaterialSnackbar.showSnackbar(data);
                                        }else{
                                            var data = {
                                                message: 'Try again! :(',
                                                actionHandler: function(event) {},
                                                actionText: 'HMS',
                                                timeout: 100
                                              };
                                              notification.MaterialSnackbar.showSnackbar(data);
                                        }
                                    }
                                }
                                var lid = $(this).attr('id');
                                console.log(lid);
                                    la.open('POST', 'http://localhost:8085/al', true);
                                    la.setRequestHeader('Content-Type', 'application/json');
                                    la.send(JSON.stringify({id: lid}));
                            });
                        }
                        
                    }else{
                        $('#message').html(logout.responseText);
                    }
                }
            }
            bmr.open('GET','http://localhost:8085/get-leave',true);
            bmr.send(null);
        



       
});
