var listWord = [{
      "word": "<img src=\"img/ICON01.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON02.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON03.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON04.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON05.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON06.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON07.png\"/>",
      "score": "50"
  }, {
      "word": "<img src=\"img/ICON08.png\"/>",
      "score": "50"
  }];
  
  var arrayBtnID = [1, 2, 3, 4, 4, 5, 6, 7, 8, 2, 1, 8, 7, 6, 5, 3];
  var listState = {
      "home": "1",
      "game": "2",
      "finish": "3",
      "end": "4"
  };
  
  var listTile = {
      "newgame": "Game Tìm Ô Giống Nhau",
      "ready": "Chuẩn Bị",
      "start": "Bắt Đầu",
      "win": "Chúc Mừng Bạn Đã Chiến Thắng",
      "lose": "Bạn Đã Thua"
  };
  
  var waitTime = 11; //10 giay cho truoc khi choi
  var playTime = 61; //1 phut choi game
  var btnSelected = null;
  var btnSelected2 = null;
  // var isSelected = false;
  var isStart = false;
  var isClockRun = false;
  var countBtn = 0;
  var mScore = 0;
  
  var current = 1;
  
  $(document).ready(function() {
      FastClick.attach(document.body);
      //readyGame();
      
      //changeState("home");      
      eventListener();
      //autoScale();
  });
  
  function autoScale() {
      var defaultWidth = 1024;
      var defaultHeight = 768;
      var thisWidth = screen.width;
      var thisHeight = screen.height;
      console.log(thisWidth + " / " + defaultWidth);
      console.log(thisHeight + " / " + defaultHeight);
      var x = 1;
      var y = 1;
  
      scalePage(thisWidth / defaultWidth, thisHeight / defaultHeight);
  }
  
  function scalePage(x, y) {
      console.log(x + "," + y);
      $('.wrapper').css({
          '-webkit-transform': 'scale(' + x + "," + y + ')',
          '-moz-transform': 'scale(' + x + "," + y + ')',
          '-ms-transform': 'scale(' + x + "," + y + ')',
          '-o-transform': 'scale(' + x + "," + y + ')',
          'transform': 'scale(' + x + "," + y + ')'
      });
  
  }
  
  function eventListener() {
      $(".btn-game").bind('click', function(event) {
          if (!$(this).hasClass("btn-touched") && isStart) {
              $(this).addClass("btn-touched");
              //isSelected = true;
              if (btnSelected != null) {
                  btnSelected2 = $(this);
                  
                  if (btnSelected.attr("data-id") == btnSelected2.attr("data-id")) {
                    
                    mScore += 50;
                    
                    //btnSelected.css('opacity', '0.0');
                    //btnSelected2.css('opacity', '0.0');
                    
                    btnSelected = null;
                    btnSelected2 = null;                    
                    
                    $("#score").text(checkScore(mScore));
                    
                    countBtn -= 2;
                    if (countBtn <= 0) {
                      
                      stopGame();
                    }
  
                  } else {
                    
                    mScore -= 20;
                    $("#score").text(checkScore(mScore));
                    
                    setTimeout(function(){
                      
                      btnSelected.removeClass("btn-touched");
                      btnSelected2.removeClass("btn-touched");
                      btnSelected = null;
                      btnSelected2 = null;                    
                      
                    },200)
                    
                    
                  }
                  
              } else {
                  btnSelected = $(this);
              }
          }
          //console.log(event);
  
      });
  
      $(".btnStart").bind('click', function(event) {
          changeState("play");
      });
      $(".btnMenu").bind('click', function(event) {
          var btnId = $(this).attr("btn-id");
          switch (btnId) {
              case "help":
                  break;
              case "rate":
                  break;
              case "info":
                  break;
          }
      });
      $(".btnRePlay").bind('click', function(event) {
          changeState("play");
      });
      $(".btnExit").bind('click', function(event) {
          changeState("home");
      });
  }
  
  
  function changeState(state) {
      $(".page").hide();
      switch (state) {
          case "home":
              $("." + state).show();
              break;
          case "play":
              readyGame();
              $("." + state).show();
              break;
          case "finish":
              $("." + state).show();
              break;
          case "end":
              $("." + state).show();
              break;
          case "help":
              $("." + state).show();
              break;
      }
  
  }
  
  function gotoPage(id){
    
    $(".page").hide();
    $(".page[bsq-id="+id+"]").fadeIn(300);
    
    current = id;
  }
  $("#input01").change(function(){checkINPUT()});
   $("#input02").change(function(){checkINPUT()});
    $("#input03").change(function(){checkINPUT()});
    
  function checkINPUT() {
      if ($("#input01").val() != '' & $("#input02").val() != '' & $("#input03").val() != '' ) {
            $("#btn-next").show();
      }
  }
  function nextBUTTON() {
    
    $(window).scrollTop(0);
    
    if (current == 5) {
      countPreview();
      current += 1;  
    }
    else if (current == 6) {
      
      if (cntGameTiming > 0) {
            
            var finalScore = 15000 - cntGameTiming;
            $(".time-text-result").html(finalScore+"<br>ms")
            current = 7;
            
            setTimeout(function(){nextBUTTON()},3000)
      }
      
    }
    else if (current == 7) {
      setTimeout(function(){nextBUTTON()},3000)
      current = 8;
    }
    else if (current == 8) {
      location.href = '';
    }
    else{      
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
  
  var arrayShuffer = [1,2,3,4,5,6,7,8,9];
  var drag_obj_1 = undefined;
  var drag_obj_2 = undefined;
  
  function bsqinitGame(){
      arrayShuffer = shuffle(arrayShuffer);
      
      for(var i=0;i<arrayShuffer.length;i++){
            var temp = $(".obj-img")[i];
            console.log($(temp).attr("original-id") + " " + arrayShuffer[i]);
            $(temp).attr("original-id", arrayShuffer[i])
            temp.src = "img/BIG/BIG ("+arrayShuffer[i]+").png";
      }
      
  }
  function checkGame() {
      for(var i=0;i<arrayShuffer.length;i++){
            var temp = $(".obj-img")[i];
            if ($(temp).attr("original-id") != $(temp).attr("game-id")) {
                  return false;
            }
      }
      return true;
  }
  $(".obj-img").click(function(){
      
      if (drag_obj_1 == undefined) {
            drag_obj_1 = $(this)
            
            //alert(drag_obj_1)
      }
      else if (drag_obj_1 != undefined && drag_obj_2 == undefined) {
            drag_obj_2 = $(this)
            
            drag_obj_1[0].src = "img/BIG/BIG ("+drag_obj_2.attr("original-id")+").png";
            drag_obj_2[0].src = "img/BIG/BIG ("+drag_obj_1.attr("original-id")+").png";
            
            var old_1 = drag_obj_1.attr("original-id")
            var old_2 = drag_obj_2.attr("original-id")
            
            drag_obj_1.attr("original-id" , old_2)
            drag_obj_2.attr("original-id" , old_1)
            
            drag_obj_1 = drag_obj_2 = undefined;
            
            if(checkGame())
            {
                  clearTimeout(gamingTIMEOUT);
                  //alert("DONE")
                  nextBUTTON();
            }
            // alert(drag_obj_1)
      }
      
      
      
})
  
  function initGame() {
      
      
      
  }
  
  var cntPreview = 10;
  function countPreview() {
      setTimeout(function(){
            cntPreview -= 1;
            $(".time-text").html(cntPreview)
            if (cntPreview <= 0) {
                  gaming();
            }else{
                  countPreview();
            }
      },1000)
  }
  
  function gaming() {
      bsqinitGame();
      $(".time-text").html("15")
      countGameTiming()
  }
  
  var cntGameTiming = 15000;
  var gamingTIMEOUT;
  function countGameTiming() {
      gamingTIMEOUT = setTimeout(function(){
            cntGameTiming -= 100;
            $(".time-text").html(cntGameTiming/1000)
            if (cntGameTiming <= 0) {
                  $(".obj-fail").show();
                  setTimeout(function(){
                        location.href = '';
                  },3000)
            }else{
                  countGameTiming();
            }
      },100)
  }
  
  
  

initSaveConfig();
function initSaveConfig(){
  if (localStorage.infoEnable == undefined) {
    
    localStorage.setItem('infoEnable','0')
    
  }
  
  if(localStorage.infoEnable == '0'){
    
  }else if(localStorage.infoEnable == '1'){
    
  }
  
}
function toggleInfo() {
    if(localStorage.infoEnable == '0'){
        localStorage.setItem('infoEnable','1');
    }else if(localStorage.infoEnable == '1'){
        localStorage.setItem('infoEnable','0');
    }
    
    restartApp();
}