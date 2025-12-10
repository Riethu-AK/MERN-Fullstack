//object 

let student = {
    name:"Sujith",
    roll:161,
    age:19
}
console.log(student.name)

for(let key in student){
    console.log(key+" "+student[key])
}

let age = 18

//TERNARY OPERATOR

let vote = (age>=18)?"Major":"Minor"
console.log(vote)  // O/P : Major

//ARROW FUNCTION 
// this is not used in arrow function
let add = (a,b)=>{console.log(a+b)}
add(1,2)               // O/P : 3


//SPREAD OPPERATOR

let a = [1, 2, 3, 4, 5]
let b = [6, 7, 8, 9, 0]
let all = [...a, ...b]
console.log(all)

let student1 = {
    name : "Sujith",
    age : 19
}

let details = {
    ...student1,
    city : "Coimbatore"
}
for (let key in details){
    console.log(key+" = "+details[key])
}

