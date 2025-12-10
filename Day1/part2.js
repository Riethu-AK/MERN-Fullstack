//Hoisting

console.log(x)
var x = 10 //           O/P : UNDEFINED FOR VAR 

// console.log(x)
// let x = 2           O/P : ERROR

//Const cannot be changed


// const y = 10
// y = 2               0/P : ERROR
// console.log(y)


// let -> block scope:it can be updated but not redeclared
// var -> functional/global scope : it can be redeclared and updated
// const -> block scope : it cannot be redeclared or updated

var a = 10
var a = 3
console.log(a)

//Switch

var a = "Siva"
switch(a){
    case "Apple":
        console.log("Apple is selected")
        break
    case "Orange":
        console.log("Orange is selected")
        break
    case "Siva":
        console.log("Siva is selected")
        break
    default:
        console.log("Not found")
}
