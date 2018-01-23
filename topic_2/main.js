/******************************************************************************* 
 * Topic 2: Objects
 *   Object Creation Functions
 *   Inheritance
 *   Properties
 *   Methods
 *   Instantiation
*******************************************************************************/

/***************************************************
 * Object creation/instantiation using an Object Literal
 **************************************************/
let person = {
  fName: "Devin",
  lName: "Cenatiempo",
  // nested objects
  address: {
    street: '1234 Easy St',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84101'
  },
  // methods
  fullName: function () { return `${this.fName} ${this.lName}`; },
  printAddress: function () {
    console.log(`${this.address.street}\n` +
    `${this.address.city}, ${this.address.state} ${this.address.zip}`);
  }
}

// accessing object properties
console.log(person.fName);
// accessing nested object properties
console.log(person.address.street);
// calling object methods
console.log(person.fullName());
person.printAddress();

/***************************************************
 * Object creation using a Factory Function
 **************************************************/
function Point(x = 0, y = 0){
  return {
    x : x,
    y: y
  };
}
  /*****************************
   * Object instantiation
   * from a Factory Function
   ****************************/
let a = Point();
let b = Point(1, 5);

console.log(a);
console.log(b);

/***************************************************
 * Object creation using a Constructor Function
 **************************************************/
function Line(start = {x:1, y:1}, end = {x:0, y:0}){
    this.start = start;
    this.end = end;
}
  /*****************************
   * Object instantiation
   * from a Constructor Function
   ****************************/
let myLine = new Line(a, b);

console.log(myLine);

/***************************************************
 * Object creation using a Object.create()
 **************************************************/
let Car = {
  wheels: 4,
  sound: function () {
    if (this.speed > 100)
      return 'vroooom';
    else if (this.speed > 30)
      return 'hummmmm';
    else return 'put-put-put'
  }
}

let corvette = Object.create(Car)
corvette.speed = 45;
/*
 * this is equivalent to:
 * let corvette = { speed: 45 };
 * Object.setPrototypeOf(corvette, Car)
 */
console.log(corvette.sound());

/***************************************************
 * Inheritance using setPrototypeOf()
 **************************************************/
let Pet = {
  name: '',
  birthDate: null,
  age: function() {
    return (
      this.birthDate === null ?
      'unkown' :
      Math.floor((Date.now() - this.birthDate) / 31536000000)
    );
  }
}

let Cat = { talk: 'meow' };
let Dog = { talk: 'woof' };
let PitBull = { breed: 'pitBull' };

// setting prototype chain 
Object.setPrototypeOf(Cat, Pet);
Object.setPrototypeOf(Dog, Pet);
Object.setPrototypeOf(PitBull, Dog);

let myDog = {
  name: "Fred",
  birthDate: new Date('June 8, 1999')
}
Object.setPrototypeOf(myDog, PitBull);

console.log(myDog.name);
console.log(myDog.breed);
console.log(myDog.talk);
console.log(myDog.age());

/***************************************************
 * Inheritance using __proto__
 * Used only on Object Literals
 **************************************************/
Dog.__proto__ = { bestFriend: 'Man' }
//Line.__proto__ = {color: 'white'}; // illegal because Line is NOT an Object
console.log(myDog.bestFriend);

/***************************************************
 * Inheritance using prototype
 * Used only on Constructor Functions
 **************************************************/
Line.prototype.color = 'red';
//Dog.prototype.color = 'brown'; // illegal because Dog is not a function
console.log(myLine.color);

