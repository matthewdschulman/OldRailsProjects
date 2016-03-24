function GlobalConfigs() {
    this.startDay = -1;
    this.startHour = -1;    
    this.erasing = false;
    this.adding = false;
    this.curMaxRight = -1;
    this.curMaxLeft = -1;
    this.curMaxUp = -1;
    this.curMaxDown = -1;
}

var mouseDown = 0;
var global_confs = new GlobalConfigs();

$(document).ready(function () {   

        document.body.onmousedown = function() { 
          ++mouseDown; 
        }
        document.body.onmouseup = function() {
          --mouseDown;
          global_confs.startDay = -1;
          global_confs.startHour = -1;
          global_confs.curMaxRight = -1;
          global_confs.curMaxLeft = -1;
          global_confs.curMaxUp = -1;
          global_confs.curMaxDown = -1;
          global_confs.erasing = false;
          global_confs.adding = false;
        }

        $("div.calendar_not_busy").mousedown(
          function () {
            global_confs.adding = true;
            global_confs.erasing = false;
            $(this).className = "calendar_busy_pending";
            var clicked_div_id = $(this).attr("id");      
            var day_hour_arr = clicked_div_id.split(",");
            global_confs.startHour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));  
            global_confs.curMaxUp = global_confs.startHour;
            global_confs.curMaxDown = global_confs.startHour;
            global_confs.startDay = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
            global_confs.curMaxRight = global_confs.startDay;
            global_confs.curMaxLeft = global_confs.startDay;

            var linked_event_id = "event" + clicked_div_id;
            var cur_class_name = document.getElementById(linked_event_id).className;

            var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

            var new_class_number = cur_class_number + gon.gradient_multiplier;

            var new_class_name = "event" + new_class_number.toString();

            document.getElementById(linked_event_id).className = new_class_name;
            
            /*$.ajax({
		        url: "/users/ajax_user_update_to_busy",
		        type: "POST",
		        data: {div_id: clicked_div_id},
		        success: function (data) { 
		            // append data to your page
		            return false
		        }
		    });*/
        }
        );

        $("div.calendar_not_busy_pending").mousedown(
          function () {
            console.log("AHA!");
            global_confs.adding = true;
            global_confs.erasing = false;
            $(this).className = "calendar_busy";
            var clicked_div_id = $(this).attr("id");      
            var day_hour_arr = clicked_div_id.split(",");
            global_confs.startHour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));  
            global_confs.curMaxUp = global_confs.startHour;
            global_confs.curMaxDown = global_confs.startHour;
            global_confs.startDay = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
            global_confs.curMaxRight = global_confs.startDay;
            global_confs.curMaxLeft = global_confs.startDay;

            var linked_event_id = "event" + clicked_div_id;
            var cur_class_name = document.getElementById(linked_event_id).className;

            var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

            var new_class_number = cur_class_number + gon.gradient_multiplier;

            var new_class_name = "event" + new_class_number.toString();

            document.getElementById(linked_event_id).className = new_class_name;
            
            /*$.ajax({
                url: "/users/ajax_user_update_to_busy",
                type: "POST",
                data: {div_id: clicked_div_id},
                success: function (data) { 
                    // append data to your page
                    return false
                }
            });*/
        }
        );

        $("div.calendar_not_busy").mouseover(            
            function() {
                if(mouseDown == 1) {
                    if (global_confs.adding == true && global_confs.erasing == false) {

                        var clicked_div_id = $(this).attr("id");      
                        var day_hour_arr = clicked_div_id.split(",");
                        var cur_day = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
                        var cur_hour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));

                        if (cur_day > global_confs.curMaxRight) {
                            global_confs.curMaxRight = cur_day;
                        }
                        if (cur_day < global_confs.curMaxLeft) {
                            global_confs.curMaxLeft = cur_day;
                        }
                        if (cur_hour < global_confs.curMaxUp) {
                            global_confs.curMaxUp = cur_hour;
                        }
                        if (cur_hour > global_confs.curMaxDown) {
                            global_confs.curMaxDown = cur_hour;
                        }

                        for (var i = global_confs.curMaxLeft; i <= global_confs.curMaxRight; i++) {
                            for (var j = global_confs.curMaxUp; j <= global_confs.curMaxDown; j++) {
                                cur_div_id = "[" + i + "," + j + "]";
                                cur_div = document.getElementById(cur_div_id);

                                if (((i <= cur_day && i >= global_confs.startDay) || (i >= cur_day && i <= global_confs.startDay))
                                    && ((j >= cur_hour && j <= global_confs.startHour) || (j <= cur_hour && j >= global_confs.startHour))) {
                                    if (cur_div.className == "calendar_not_busy") {
                                        cur_div.className = "calendar_busy_pending";
                                    }
                                } else {
                                    if (cur_div.className == "calendar_busy_pending") {
                                        cur_div.className = "calendar_not_busy";
                                    }
                                }                            
                            }
                        }                        

                        var linked_event_id = "event" + clicked_div_id;
                        console.log("Adding..." + linked_event_id + " | global_confs.adding = " + global_confs.adding + " | global_confs.erasing = " + global_confs.erasing);
                        var cur_class_name = document.getElementById(linked_event_id).className;

                        var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

                        var new_class_number = cur_class_number + gon.gradient_multiplier;

                        var new_class_name = "event" + new_class_number.toString();
                        document.getElementById(linked_event_id).className = new_class_name;

                        /*$.ajax({
                            url: "/users/ajax_user_update_to_busy",
                            type: "POST",
                            data: {div_id: clicked_div_id},
                            success: function (data) { 
                                // append data to your page
                                return false
                            }
                        });*/
                    }
                }
            }            
        );

        $("div.calendar_not_busy_pending").mouseover(            
            function() {
                if(mouseDown == 1) {
                    if (global_confs.adding == true && global_confs.erasing == false) {

                        var clicked_div_id = $(this).attr("id");      
                        var day_hour_arr = clicked_div_id.split(",");
                        var cur_day = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
                        var cur_hour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));

                        if (cur_day > global_confs.curMaxRight) {
                            global_confs.curMaxRight = cur_day;
                        }
                        if (cur_day < global_confs.curMaxLeft) {
                            global_confs.curMaxLeft = cur_day;
                        }
                        if (cur_hour < global_confs.curMaxUp) {
                            global_confs.curMaxUp = cur_hour;
                        }
                        if (cur_hour > global_confs.curMaxDown) {
                            global_confs.curMaxDown = cur_hour;
                        }

                        for (var i = global_confs.curMaxLeft; i <= global_confs.curMaxRight; i++) {
                            for (var j = global_confs.curMaxUp; j <= global_confs.curMaxDown; j++) {
                                cur_div_id = "[" + i + "," + j + "]";
                                cur_div = document.getElementById(cur_div_id);

                                if (((i <= cur_day && i >= global_confs.startDay) || (i >= cur_day && i <= global_confs.startDay))
                                    && ((j >= cur_hour && j <= global_confs.startHour) || (j <= cur_hour && j >= global_confs.startHour))) {
                                    if (cur_div.className == "calendar_not_busy") {
                                        cur_div.className = "calendar_busy_pending";
                                    }
                                } else {
                                    if (cur_div.className == "calendar_busy_pending") {
                                        cur_div.className = "calendar_not_busy";
                                    }
                                }                            
                            }
                        }                        

                        var linked_event_id = "event" + clicked_div_id;
                        console.log("Adding..." + linked_event_id + " | global_confs.adding = " + global_confs.adding + " | global_confs.erasing = " + global_confs.erasing);
                        var cur_class_name = document.getElementById(linked_event_id).className;

                        var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

                        var new_class_number = cur_class_number + gon.gradient_multiplier;

                        var new_class_name = "event" + new_class_number.toString();
                        document.getElementById(linked_event_id).className = new_class_name;

                        /*$.ajax({
                            url: "/users/ajax_user_update_to_busy",
                            type: "POST",
                            data: {div_id: clicked_div_id},
                            success: function (data) { 
                                // append data to your page
                                return false
                            }
                        });*/
                    }
                }
            }            
        );

        
        $("div.calendar_busy").mousedown(
          function () {
            $(this).className = "calendar_not_busy_pending";
            global_confs.erasing = true;
            global_confs.adding = false;
            var clicked_div_id = $(this).attr("id");
            var day_hour_arr = clicked_div_id.split(",");
            global_confs.startHour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));  
            global_confs.curMaxUp = global_confs.startHour;
            global_confs.curMaxDown = global_confs.startHour;
            global_confs.startDay = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
            global_confs.curMaxRight = global_confs.startDay;
            global_confs.curMaxLeft = global_confs.startDay;
            
            var linked_event_id = "event" + clicked_div_id;
            var cur_class_name = document.getElementById(linked_event_id).className;

            var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

            var new_class_number = cur_class_number - gon.gradient_multiplier;

            var new_class_name = "event" + new_class_number.toString();

            document.getElementById(linked_event_id).className = new_class_name;

            /*$.ajax({
                url: "/users/ajax_user_update_to_free",
                type: "POST",
                data: {div_id: clicked_div_id},
                success: function (data) { 
                    // append data to your page
                    return false
                }
            });*/
        }
        );

        $("div.calendar_busy_pending").mousedown(
          function () {
            $(this).className = "calendar_not_busy";
            global_confs.erasing = true;
            global_confs.adding = false;
            var clicked_div_id = $(this).attr("id");
            var day_hour_arr = clicked_div_id.split(",");
            global_confs.startHour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));  
            global_confs.curMaxUp = global_confs.startHour;
            global_confs.curMaxDown = global_confs.startHour;
            global_confs.startDay = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
            global_confs.curMaxRight = global_confs.startDay;
            global_confs.curMaxLeft = global_confs.startDay;
            
            var linked_event_id = "event" + clicked_div_id;
            var cur_class_name = document.getElementById(linked_event_id).className;

            var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

            var new_class_number = cur_class_number - gon.gradient_multiplier;

            var new_class_name = "event" + new_class_number.toString();

            document.getElementById(linked_event_id).className = new_class_name;

            /*$.ajax({
                url: "/users/ajax_user_update_to_free",
                type: "POST",
                data: {div_id: clicked_div_id},
                success: function (data) { 
                    // append data to your page
                    return false
                }
            });*/
        }
        );

        $("div.calendar_busy").mouseover(            
            function () {
                if(mouseDown == 1) {
                    if (global_confs.erasing == true && global_confs.adding == false) {
                        var clicked_div_id = $(this).attr("id");      
                        var day_hour_arr = clicked_div_id.split(",");
                        var cur_day = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
                        var cur_hour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));

                        if (cur_day > global_confs.curMaxRight) {
                            global_confs.curMaxRight = cur_day;
                        }
                        if (cur_day < global_confs.curMaxLeft) {
                            global_confs.curMaxLeft = cur_day;
                        }
                        if (cur_hour < global_confs.curMaxUp) {
                            global_confs.curMaxUp = cur_hour;
                        }
                        if (cur_hour > global_confs.curMaxDown) {
                            global_confs.curMaxDown = cur_hour;
                        }

                        for (var i = global_confs.curMaxLeft; i <= global_confs.curMaxRight; i++) {
                            for (var j = global_confs.curMaxUp; j <= global_confs.curMaxDown; j++) {
                                cur_div_id = "[" + i + "," + j + "]";
                                cur_div = document.getElementById(cur_div_id);

                                if (((i <= cur_day && i >= global_confs.startDay) || (i >= cur_day && i <= global_confs.startDay))
                                    && ((j >= cur_hour && j <= global_confs.startHour) || (j <= cur_hour && j >= global_confs.startHour))) {
                                    if (cur_div.className == "calendar_busy") {
                                        cur_div.className = "calendar_not_busy_pending";
                                    }
                                } else {
                                    if (cur_div.className == "calendar_not_busy_pending") {
                                        cur_div.className = "calendar_busy";
                                    }
                                }                            
                            }
                        }   
                                
                    
                        var linked_event_id = "event" + clicked_div_id;
                        console.log("Erasing..." + linked_event_id);
                        
                        var cur_class_name = document.getElementById(linked_event_id).className;

                        var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

                        var new_class_number = cur_class_number - gon.gradient_multiplier;

                        var new_class_name = "event" + new_class_number.toString();

                        document.getElementById(linked_event_id).className = new_class_name;

                        /*$.ajax({
                            url: "/users/ajax_user_update_to_free",
                            type: "POST",
                            data: {div_id: clicked_div_id},
                            success: function (data) { 
                                // append data to your page
                                return false
                            }
                        });*/
                    }
                }            
            }
        );

        $("div.calendar_busy_pending").mouseover(            
            function () {
                if(mouseDown == 1) {
                    if (global_confs.erasing == true && global_confs.adding == false) {
                        var clicked_div_id = $(this).attr("id");      
                        var day_hour_arr = clicked_div_id.split(",");
                        var cur_day = parseInt(day_hour_arr[0].slice(1,day_hour_arr[0].length));
                        var cur_hour = parseInt(day_hour_arr[1].slice(0,day_hour_arr[1].length - 1));

                        if (cur_day > global_confs.curMaxRight) {
                            global_confs.curMaxRight = cur_day;
                        }
                        if (cur_day < global_confs.curMaxLeft) {
                            global_confs.curMaxLeft = cur_day;
                        }
                        if (cur_hour < global_confs.curMaxUp) {
                            global_confs.curMaxUp = cur_hour;
                        }
                        if (cur_hour > global_confs.curMaxDown) {
                            global_confs.curMaxDown = cur_hour;
                        }

                        for (var i = global_confs.curMaxLeft; i <= global_confs.curMaxRight; i++) {
                            for (var j = global_confs.curMaxUp; j <= global_confs.curMaxDown; j++) {
                                cur_div_id = "[" + i + "," + j + "]";
                                cur_div = document.getElementById(cur_div_id);

                                if (((i <= cur_day && i >= global_confs.startDay) || (i >= cur_day && i <= global_confs.startDay))
                                    && ((j >= cur_hour && j <= global_confs.startHour) || (j <= cur_hour && j >= global_confs.startHour))) {
                                    if (cur_div.className == "calendar_busy") {
                                        cur_div.className = "calendar_not_busy_pending";
                                    }
                                } else {
                                    if (cur_div.className == "calendar_not_busy_pending") {
                                        cur_div.className = "calendar_busy";
                                    }
                                }                            
                            }
                        }   
                                
                    
                        var linked_event_id = "event" + clicked_div_id;
                        console.log("Erasing..." + linked_event_id);
                        
                        var cur_class_name = document.getElementById(linked_event_id).className;

                        var cur_class_number = parseInt(cur_class_name.slice(5,cur_class_name.length));

                        var new_class_number = cur_class_number - gon.gradient_multiplier;

                        var new_class_name = "event" + new_class_number.toString();

                        document.getElementById(linked_event_id).className = new_class_name;

                        /*$.ajax({
                            url: "/users/ajax_user_update_to_free",
                            type: "POST",
                            data: {div_id: clicked_div_id},
                            success: function (data) { 
                                // append data to your page
                                return false
                            }
                        });*/
                    }
                }            
            }
        );
      

