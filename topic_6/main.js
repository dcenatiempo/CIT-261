/******************************************************************************* 
 * Topic 5: DOM Manipulation
 *   createElement
 *   appendChild
 *   insertBefore
 *   removeChild
 *   etc.
*******************************************************************************/
var counter = 1;
var body = document.getElementsByTagName('body');
console.log(body[0])

document.getElementById('add-begin').addEventListener('click', function() {
  counter++;
  var newDiv = createDiv(counter);
  body.insertBefore(newDiv, body.children[1]);
  // Insert element2 as child of element 1, right before element3
element1.insertBefore(element2, element3)
});
document.querySelector('#add-begin').addEventListener('click', function() {
  
});
/***************************************************
 * createElement
 **************************************************/
function createDiv(num) {
  var newDiv = document.createElement('div');
  newDiv.appendChild(
    document.createElement('h2')
      .appendChild(
        createTextNode(`Element #${num}`)));
  newDiv.appendChild(
    document.createElement('button')
      .appendChild(
        createTextNode('Click to change color'))
      .classList.add('change-color'));
  newDiv.appendChild(
    document.createElement('button')
      .appendChild(
        createTextNode('Click to Remove me'))
      .classList.add('remove'));
  return newDiv;
};
  /*****************************
   * 
   ****************************/