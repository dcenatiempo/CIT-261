// get time
const PI = Math.PI;
const offset = 45;

var face = document.querySelector('.face')
face.addEventListener('click', () => {
  face.classList.add('bump');
  setTimeout(()=>{face.classList.remove('bump');},3010);
})
// set minute hand
var minuteHand = document.querySelector('.minute-container');
var mDeg = getTime().m*6;
advanceMin();
// set hour hand
var hourHand = document.querySelector('.hour-container');
var hDeg = (getTime().h*15)+(Math.round(getTime().m/12)+3);

advanceHour();
// set timer for hour hand
setInterval(advanceHour, 60000)
// set timer for minute hand
setInterval(advanceMin, 60000)

function getTime () {
  var time = new Date();
  return {
    m: time.getMinutes(),
    h: time.getHours()
  }
}
function cos(deg) {
  var radians = (deg*PI)/180;
  var cos = Math.round(Math.cos(radians)*10)/10;
  return cos;
}

function sin(deg) {
  var radians = (deg*PI)/180;
  var sin = Math.round(Math.sin(radians)*10)/10;
  return sin;
}

function advanceHour() {
  hDeg = (getTime().h*15)+(Math.round(getTime().m/12)+3);
  hourHand.style.transform = `rotate(${hDeg}deg)`
  hourHand.querySelector('.hand')
    .style.boxShadow = `${.6*sin(hDeg+offset)}vw ${.6*cos(hDeg+offset)}vw .6vw rgba(0, 0, 0, .5)`;
}

function advanceMin() {
  mDeg = getTime().m*6;
  minuteHand.style.transform = `rotate(${mDeg}deg)`;
  minuteHand.querySelector('.hand')
    .style.boxShadow = `${.8*sin(mDeg+offset)}vw ${.8*cos(mDeg+offset)}vw .65vw rgba(0, 0, 0, .5)`;
}