var time_text = document.getElementById("time-text");
var time_slider = document.getElementById("time-slider");
var time_val;

var bg = document.getElementById("bg");
var night_sky = document.getElementById("night-sky");
var cosmos = document.getElementById("cosmos");
var day_sky = document.getElementById("day-sky");


function getCurrentTime() {
  var date = new Date();
  var hr = date.getHours();
  var min  = date.getMinutes();
  var sec = date.getSeconds();
  return { hr, min, sec };
}

function setSliderVal(hr, min) {
  time_val = (hr * 60) + min;
  time_slider.value = time_val;
}

function setTimeTextVal(hr, min) {
  var period = (hr < 12 ? "AM" : hr == 24 ? "AM" : "PM");
  hr = hr % 12;
  hr = (hr < 10 ? "0" : "") + hr;
  hr = (hr == 0 ? "12" : hr);
  min = (min < 10 ? "0" : "") + min;
  var time = hr + ":" + min + " " + period;
  time_text.innerHTML = time;

  setCosmos();
}

function setCurrentTime() {
  var curr_time = getCurrentTime();
  var hr = curr_time.hr;
  var min = curr_time.min;
  var sec = curr_time.sec;
  // set slider position
  setSliderVal(hr, min);
  // configure and set time text (12 hr format)
  setTimeTextVal(hr, min);

  // set recursive callback timeout based on seconds value
  var delay = (60-sec) * 1000;
  setTimeout(setCurrentTime, delay);
}
// initial call
setCurrentTime();


// action if user manually updates slider
function updateSlider(val) {
  var hr = Math.floor(val / 60);
  var min = (val % 60);
  time_val = (hr * 60) + min;
  setTimeTextVal(hr, min);
}



var rotation = 0;
function setCosmos() {
  var rotation = time_val / 1440 * 360;
  cosmos.style.transform = "translateX(-50%) rotate(" + rotation + "deg)";

  if ((rotation > 90) && (rotation < 270)) {
    night_sky.style.transform = "translateX(-50%) rotate(180deg)";
    day_sky.style.transform = "translateX(-50%) rotate(180deg)";
    tempColorChange("day");
  } else {
    night_sky.style.transform = "translateX(-50%) rotate(0)";
    day_sky.style.transform = "translateX(-50%) rotate(0)";
    tempColorChange("night");
  }
}

function tempColorChange(day_night) {
  if (day_night == "day") {
    bg.style.background = "var(--sky-blue)";
  } else {
    bg.style.background = "black";
  }

}
