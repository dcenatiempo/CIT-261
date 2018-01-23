/******************************************************************************* 
 * Topic 1: JavaScript Basics
 *   Variables
 *   Arrays
 *   Associative Arrays (Objects)
 *   Functions
 *   Parameters
 *   Loops
 *   Conditional Statements
*******************************************************************************/

/***************************************************
 * Variables & Types
 **************************************************/

  /*****************************
   * Var
   *   Function Scope
   *   May be reassigned
   ****************************/

   // declaration
   var myString;
   // initialization
   myString = "Hello";
   console.log(myString); // Hello
   // reassignment
   myString = "Goodbye"
   console.log(myString); // Goodbye

   // declaration and instantiation
   var myNum = 5;
   var myBool = true;
   var myNull = null;
   var myUndefined; // undefinded

   var wildcard = 'Hello World';
   console.log(typeof wildcard); // "string"
   wildcard = 3.14159;
   console.log(typeof wildcard); // "number"
   wildcard = false;
   console.log(typeof wildcard); // "boolean"
   wildcard = null;
   console.log(typeof wildcard); // "object" this is a well known JS error
   wildcard = undefined;
   console.log(typeof wildcard); // "undefined"
   
   // undeclared variables are "Hoisted"
   undeclaredVar = 5;
   console.log(typeof undeclaredVar);

   {
     var globalVar = "no block scope";
   }
   console.log(globalVar); // "no block scope"
  /*****************************
   * Let
   *   Block Scope
   *   May be reassigned
   ****************************/
   
   {
     let localVar = "has block scope";
   }
   //console.log(localVar); // error: localVar is not defined

  /*****************************
   * Const
   *   Block Scope
   *   No reassignment
   ****************************/

   // const unInitialized; // error: const must be initialized at declaration
   {
     const PI = 3.14159;
     //PI++; // error: const cannot be reassigned
     // but a const can be mutated if it is an object (like an array)
   }
   //console.log(PI); // error: PI is not defined

/***************************************************
 * Arrays
 **************************************************/

  const myArray = [1,2,3];
  // myArray = [1,2,3,4]; // error: const cannot be reassigned
  myArray.length; // 3
  // access items in arrays with zero indexed bracket notation
  myArray[1]; // 2
  // find the index of the first instance of a value
  myArray.indexOf(2); //1

 /*****************************
   * common mutating methods
   ****************************/

  myArray.push(4);           // [1,2,3,4]
  myArray.pop();             // [1,2,3]
  myArray.shift();           // [2,3]
  myArray.unshift('a');      // ['a',2,3]
  myArray.reverse();         // [3,2,'a'];
  myArray.splice(2, 0, 'b'); // [3,2,'b','a']

  /*****************************
   * common nun-mutating methods
   * these return a new array
   ****************************/
  
  var newArray, newString, result;

  newArray = myArray.concat([true, 'cat']);
  console.log(newArray); //[3,2,'b','a',true,'cat']
  newArray = newArray.slice(1,4);
  console.log(newArray); // [2,'b','a']
  newString = newArray.join("-");
  console.log(newString) // 2-b-a

  /*****************************
   * common higher order functions
   * do not mutate the array
   * take a callback function as an argument
   * return a new value
   ****************************/

  newArray = [1,2,3,4];
  
  // filter out odd items
  result = newArray.filter(i=>i%2==0);
  console.log(result); // [2,4]

  // find first item greater than 2
  result = newArray.find(i=>i>2);
  console.log(result); // 3

  // multiply each item by 2
  newArray = newArray.map(i=>i*2);
  console.log(newArray); // [2,4,6,8]

  // sum all items
  result = newArray.reduce((sum,i)=>sum+i);
  console.log(result); //

/***************************************************
 * Associative Arrays (objects)
 * these will be discussed more in topic 2
 **************************************************/

  var myObject = {
    name: "Devin",
    'age': 35,
    isMale: true
  }
  /*****************************
   * common object methods
   ****************************/

  result = Object.getOwnPropertyNames(myObject);
  console.log(result); //
  
  result = Object.values(myObject);
  console.log(result); // ['Devin', '35', 'true']
  
  result = myObject.hasOwnProperty('age');
  console.log(result); // true

/***************************************************
 * Functions
 **************************************************/

function myFunction1() {
  console.log('this is a function')
};

var myFunction2 = function() {
  console.log('this is also a function')
};

var arrowFunction1 = () => {
  console.log('this is an arrow function')
};

(function(){
  console.log('this is an immediately invoked function expression');
  console.log('also known as an IIFE');
})();

/***************************************************
 * Parameters
 **************************************************/
var myFunction3 = function(message) {
  console.log(message);
}
myFunction3('this is an argument that gets passed as a parameter');

// variables in a function have local scope
function add2(a) {
  var two = 2;
  return a + two;
}
//console.log(two); // error: two is not defined
result = add2(5);
console.log(result); // 7

// this is also an arrow function that takes a parameter
// & only has one line that returns a value
var addOne = a => a+1;
result = addOne(5);
console.log(result); //6

var unknownArgs1 = function () {
  console.log(arguments.length); // 6
  console.log(arguments[2]); // c
  //return arguments.indexOf('a'); // illegal because arguments is an array like object, not an array!
}
unknownArgs1('a', 'b', 'c', 1, 2, 3);

var sillyFunctionThatUsesSpreadOperator = function(...myArgs) {
  if(myArgs.length>2) {
    var Arg2 = (myArgs[2]);
    return myArgs.indexOf(Arg2); // we can do this because myArgs is an Array
  }
  else return null;
}
result = sillyFunctionThatUsesSpreadOperator('a', 'b', 'c', 1, 2, 3);
console.log(result);

/***************************************************
 * Loops
 **************************************************/

var myObj = {
  "a": 1,
  "b": 2,
  "c": 3,
  "d": 4,
};

yourArray = [1,2,3,4];

  /*****************************
   * for
   ****************************/

   for (let i=0; i<yourArray.length; i++) {
     console.log(yourArray[i]); // 1, 2, 3, 4
   }

  /*****************************
   * while
   ****************************/
  
  var i = 0;
  while (i < yourArray.length) {
    console.log(yourArray[i++] ); // 1, 2, 3, 4
  }

  /*****************************
   * do/while
   ****************************/
  
  i = 0;
  do {
    console.log(yourArray[i]); // 1, 2, 3, 4
    i++;
  }
  while (i < yourArray.length);

  /*****************************
   * for/of
   ****************************/

  for (let item of yourArray) {
    console.log(item); // 1, 2, 3, 4
  }

  /*****************************
   * forEach()
   ****************************/

  yourArray.forEach( item => {
    console.log(item); //1, 2, 3, 4
  })

  /*****************************
   * for/in
   ****************************/

  for (key in myObj) {
    console.log(key); // a, b, c, d
  }

/***************************************************
 * Conditional Statements
 **************************************************/

  var test = true;

  /*****************************
   * if/else
   ****************************/
  if (test === true) {
    console.log('test is true');
  }
  else if (test == false) {
    console.log('test is false');
  }
  else {
    console.log("test is neither true nor false");
  }
  /*****************************
   * switch
   ****************************/

  switch (test) {
    case true:
      console.log('test is true');
      break;
    case false:
      console.log('test is fale');
      break;
    default:
      console.log("test is neither true nor false");
  };

  /*****************************
   * conditional/ternary
   ****************************/

  test === true ? console.log('test is true') : console.log('test is fale');