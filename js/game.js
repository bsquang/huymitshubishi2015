var cntPreview = 10;
var maxGameTiming = 60000;
var cntGameTiming = maxGameTiming;
var timeScoreView = 5000;
var id_choice = 1;
var current = 1;

var user = {
      "name":"",
      "mobile":"",
      "email":"",
      "score":""
}

var GAME_PREVIEW = 1;
var GAME_RUN = 2;
var GAME_WIN = 3;
var GAME_STATE = GAME_PREVIEW;

$(document).ready(function() {
    FastClick.attach(document.body);
    $(".time-text").html(cntPreview+"s")
    setTimeout(function(){
      
      $("#scene01-ele01").show();
      $("#scene01-ele01").addClass("fadeIn")
      
      setTimeout(function(){
            $("#scene01-ele02").fadeIn();
            $("#scene01-ele02").addClass("pulse")
      }, 1500);

      },200)
    gotoPage(1)
});

function blockMove() {
      event.preventDefault() ;
}




function gotoPage(id) {

    $(".page").hide();
    $(".page[bsq-id=" + id + "]").fadeIn(300);

    current = id;
}

$("#input01").change(function() {
    checkINPUT()
});
$("#input02").change(function() {
    checkINPUT()
});
$("#input03").change(function() {
    checkINPUT()
});



function checkINPUT() {
      
      var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
      var bTest = false;
      if ($("#input03").val() != '' && reg_mail.test($("#input03").val()) == false) {
            alert('Email không hợp lệ (ví dụ: abc@gmail.com)')
            
            bTest = true;
      }
      
      if ($("#input02").val() != '' && isNaN($("#input02").val()) == true) {
            alert('Số điện thoại phải là kiểu số')
            
            bTest = true;
      }else if ($("#input02").val().length > 11 && isNaN($("#input02").val()) == false) {
            alert('Số điện thoại dài quá 11 số')
            bTest = true;
      }else if ($("#input02").val() != '' && $("#input02").val().length < 8 && isNaN($("#input02").val()) == false) {
            alert('Số điện thoại phải lớn hơn 8 số')
            bTest = true;
      }
      
      if (bTest) {
            $("#btn-next").hide();
            return;
      }
      if ($("#input01").val() != '' & $("#input02").val() != '' & $("#input03").val() != '') {
        
            user.name = $("#input01").val();
            user.mobile = $("#input02").val();
            user.email = $("#input03").val();
            
            $("#btn-next").show();
            $("#btn-next").addClass('pulse')
      }
}

function nextBUTTON() {

    $(window).scrollTop(0);

    if (current == 1) {
        current = 3;
        //setTimeout(function(){$("#input01").focus();},300)
      
    }else if (current == 4) {
      
      $(".itemThumb").show();
      $(".itemThumb").addClass("bigEntrance")
      
      current += 1;
    }
    else if (current == 5) {
        setTimeout(function(){
            
            $(".main-picture").show();
            $(".main-picture").addClass("expandOpen")
            
            $(".time-panel").show()
            $(".time-panel").addClass("slideUp")
            countPreview();
      },100)
        
        
        current += 1;
    } else if (current == 6) {

        if (cntGameTiming > 0) {

            var finalScore = maxGameTiming - cntGameTiming;
            user.score = finalScore;
            saveScore();
            $(".time-text-result").html(finalScore + "<br>ms")
            
            getTopScore();
            
            current = 8;

            setTimeout(function() {
                nextBUTTON()
            }, timeScoreView)
        }

    } else if (current == 7) {
        //setTimeout(function() {
        //    nextBUTTON()
        //}, 3000)
        
        current = 8;
    } else if (current == 8) {
        location.href = '';
    } else {
        current += 1;
    }

    gotoPage(current);

}



function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var arrayShuffer = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var drag_obj_1 = undefined;
var drag_obj_2 = undefined;

function bsqinitGame() {
    arrayShuffer = shuffle(arrayShuffer);

    for (var i = 0; i < arrayShuffer.length; i++) {
        var temp = $(".itemList")[i];
        console.log($(temp).attr("original-id") + " " + arrayShuffer[i]);
        $(temp).attr("original-id", arrayShuffer[i])
        $(temp).find("img")[0].src = "img/CAR0"+id_choice+"/CAR_ELE_0"  + arrayShuffer[i] + ".png";
    }

}

function checkGame() {
    for (var i = 0; i < arrayShuffer.length; i++) {
        var temp = $(".itemList")[i];
        if ($(temp).attr("original-id") != $(temp).attr("game-id")) {
            return false;
        }
    }
    return true;
}
function checkNumber(num){
      if (num<10) {
            return "0"+num;
      }
      return num;
}
function selectCar(obj){
      id_choice = $(obj).attr("bsq-id");
      
      for (var i = 0; i < arrayShuffer.length; i++) {
        var temp = $(".itemList")[i];       
        $(temp).attr("original-id", arrayShuffer[i])
        $(temp).find("img")[0].src = "img/CAR0"+id_choice+"/CAR_ELE_0"  + arrayShuffer[i] + ".png";
      }
      
      $(".itemThumb").removeClass("pulse");
      $(obj).addClass('pulse')
      
      setTimeout(function(){
      
            $("#btn-select-next").show();
            $("#btn-select-next").addClass('slideLeft')
            
            setTimeout(function(){$("#btn-select-next").addClass('pulse')},1000)
      
      
      },200)
     
}
function selectImage(obj){      
      if (GAME_STATE == GAME_PREVIEW) {
            return;
      }
    if (drag_obj_1 == undefined) {
        drag_obj_1 = $(obj)
        
        $(obj).find(".overlay-select").show();
        $(obj).addClass('pulse')
        

        //alert(drag_obj_1)
    } else if (drag_obj_1 != undefined && $(obj).attr("original-id") != drag_obj_1.attr("original-id") && drag_obj_2 == undefined) {
        drag_obj_2 = $(obj)
        
        console.log("img/CAR0"+id_choice+"/CAR_ELE_0"  + drag_obj_2.attr("original-id") + ".png")
        console.log("img/CAR0"+id_choice+"/CAR_ELE_0"  + drag_obj_1.attr("original-id") + ".png")
        
        drag_obj_1.find("img")[0].src = "img/CAR0"+id_choice+"/CAR_ELE_0"  + drag_obj_2.attr("original-id") + ".png";
        drag_obj_2.find("img")[0].src = "img/CAR0"+id_choice+"/CAR_ELE_0"  + drag_obj_1.attr("original-id") + ".png";
        
            $(drag_obj_1).addClass("changePosAni")
            $(drag_obj_2).addClass("changePosAni")
            
            $(drag_obj_1).removeClass('pulse')
            
            setTimeout(function(){
                  $(drag_obj_1).removeClass("changePosAni")
                  $(drag_obj_2).removeClass("changePosAni")
            },500)
        

        var old_1 = drag_obj_1.attr("original-id")
        var old_2 = drag_obj_2.attr("original-id")

        drag_obj_1.attr("original-id", old_2)
        drag_obj_2.attr("original-id", old_1)
        
        drag_obj_1.find(".overlay-select").hide();

        drag_obj_1 = drag_obj_2 = undefined;
        
        

        if (checkGame()) {
            clearTimeout(gamingTIMEOUT);
            //alert("DONE")
            GAME_STATE = GAME_WIN;
            
            $(".time-panel").hide()
            $(".main-picture").css({"left":"230px"})
            $(".main-picture").removeClass("expandOpen")
            $(".main-picture").addClass("fadeIn")
            
            setTimeout(function(){
                  nextBUTTON();
            },5000)
            
        }
        // alert(drag_obj_1)
    }



}

function countPreview() {
    setTimeout(function() {
        cntPreview -= 1;
        $(".time-text").html(checkNumber( cntPreview )+"s")
        if (cntPreview <= 0) {
            gaming();
        } else {
            countPreview();
        }
    }, 1000)
}

function gaming() {
      GAME_STATE = GAME_RUN;
    bsqinitGame();
    $(".time-text").html(checkNumber( Math.round(cntGameTiming / 1000) )+"s")
    $(".time-label2").html("để hoàn thành trò chơi");
    countGameTiming()
}

function removeDauTiengViet(content){
      var str = content;
      str= str.toLowerCase();
      str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
      str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
      str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
      str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
      str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
      str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
      str= str.replace(/đ/g,"d");
      str= str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g," ");
      str= str.replace(/-+-/g," ");
      str= str.replace(/^\-+|\-+$/g,"");
      return str;
}
function checkName(content){
      
      if (content.length > 22) {
           content = content.substring(0,22)
      }
      return content.toUpperCase();
}
function getTopScore() {
      var arrayTopScore = list_data_local;
      var tempDIVParent="";
      
      arrayTopScore.sort(function(a, b) {
            return parseFloat(a.score) - parseFloat(b.score);
        });
      
      if (arrayTopScore.length > 8) {
            arrayTopScore = arrayTopScore.slice(0,8);
      }
      
      for(var i=0;i<arrayTopScore.length;i++){
            
            var divContent = "<div class='itemScore group'>";
            divContent += "<p class='item-score-text'>"+checkNumber(Math.round((arrayTopScore[i].score / 1000)))+"</p>"
            divContent += "<p class='item-score-name'>"+checkName(arrayTopScore[i].name)+"</p>"
            divContent += "</div>"
            
            tempDIVParent += divContent;
      }
      
      $(".listScore").append(tempDIVParent);      
      $(".itemScore").show().addClass("slideUp");
      
}

function saveScore(){
      list_data_local.push(user);
      data2Local();
}
function clearDataLocal(){
      list_data_local = [];
      data2Local();
}

var gamingTIMEOUT;

function countGameTiming() {
    gamingTIMEOUT = setTimeout(function() {
        cntGameTiming -= 100;
        $(".time-text").html(checkNumber( Math.round(cntGameTiming / 1000) )+"s")
        if (cntGameTiming <= 0) {
            $(".obj-fail").show();
            saveScore();
            setTimeout(function() {
                location.href = '';
            }, 3000)
        } else {
            countGameTiming();
        }
    }, 100)
}



var list_data_local = [];
initDataLocal();
function initDataLocal(){
  if (localStorage.list_data_local == undefined) {    
    localStorage.setItem('list_data_local','[]')    
  }else{    
    var temp = JSON.parse(localStorage.list_data_local);
	list_data_local = temp;    
  }
}
function data2Local(){
  
  var data_json = JSON.stringify(list_data_local);
  localStorage.list_data_local = data_json; 
}

function restartApp() {
      location.reload();
}