(function(){
  "use strict";
  var MUSIC_FILE = ""; // e.g. "assets/music/song.mp3". Leave empty to hide the music button.
  var $ = function(id){return document.getElementById(id);};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function go(id){
    var cur = document.querySelector(".screen.active"), next = $(id);
    function show(){
      next.classList.add("active");
      next.scrollTop = 0;
      requestAnimationFrame(function(){requestAnimationFrame(function(){next.classList.add("show");});});
    }
    cur.classList.remove("show");
    setTimeout(function(){cur.classList.remove("active");show();}, reduce?0:700);
  }
  document.querySelector(".screen.active").classList.add("show");

  $("openBtn").addEventListener("click", function(){
    go("envelope");
    setTimeout(function(){$("env").classList.add("open");}, reduce?0:1500);
    setTimeout(function(){go("letter");}, reduce?300:4300);
  });
  $("nextBtn").addEventListener("click", function(){go("closing");});
  $("againBtn").addEventListener("click", function(){go("letter");});

  if(!reduce){
    var box = $("petals");
    for(var i=0;i<14;i++){
      var p = document.createElement("span");
      p.className = "petal";
      p.style.left = Math.random()*100+"vw";
      p.style.setProperty("--dx",(Math.random()*120-60)+"px");
      p.style.animationDuration = (14+Math.random()*14)+"s";
      p.style.animationDelay = (-Math.random()*20)+"s";
      box.appendChild(p);
    }
  }

  if(MUSIC_FILE){
    var btn = $("music"), audio = new Audio(MUSIC_FILE);
    audio.loop = true; audio.preload = "none";
    btn.hidden = false;
    btn.addEventListener("click", function(){
      if(audio.paused){
        audio.play().then(function(){btn.textContent="Pause music";btn.setAttribute("aria-pressed","true");})
          .catch(function(){btn.hidden = true;});
      } else {
        audio.pause();btn.textContent="Play music";btn.setAttribute("aria-pressed","false");
      }
    });
    audio.addEventListener("error", function(){btn.hidden = true;});
  }
})();
