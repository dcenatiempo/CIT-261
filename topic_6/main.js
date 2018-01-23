/******************************************************************************* 
 * Topic 5: DOM Manipulation
 *   createElement
 *   appendChild
 *   insertBefore
 *   removeChild
 *   etc.
*******************************************************************************/

var counter = 1;
var container = document.getElementById('container');

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `${getRandInt(0,255)}, ${getRandInt(0,255)}, ${getRandInt(0,255)}`;
}

document.getElementById('add-begin').addEventListener('click', function() {
  counter++;
  var newDiv = createDiv(counter);
  console.log(container.children);
  container.insertBefore(newDiv, container.children[0]);
});

document.querySelector('#add-end').addEventListener('click', function() {
  counter++;
  var newDiv = createDiv(counter);
  container.appendChild(newDiv);
});

document.getElementById('container').addEventListener('click', function(e) {
    if (e.target.className === 'remove') {
      console.log('removing element!!!')
      let div = e.target.parentElement;
      div.parentNode.removeChild(div);
    }
    else if (e.target.className === 'change-color') {
      console.log('changing color!!!')
      let div = e.target.parentElement;
      div.setAttribute('style', `background-color: rgb(${randomColor()})`)
    }
});

/***************************************************
 * createElement
 **************************************************/
function createDiv(num) {
  var newDiv = document.createElement('div');
  newDiv.classList.add('clone');

  var h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(`Element #${num}`));
  newDiv.appendChild(h2);

  var button1 = document.createElement('button');
  button1.appendChild(document.createTextNode('Click to change color'));
  button1.classList.add('change-color');
  newDiv.appendChild(button1);
     
  var button2 = document.createElement('button');
  button2.appendChild(document.createTextNode('Click to Remove me'));
  button2.classList.add('remove');
  newDiv.appendChild(button2);

  return newDiv;
};
  /*****************************
   * 
   ****************************/