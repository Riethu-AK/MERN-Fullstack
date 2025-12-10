//ARRAY DESTRUCTING

const num = [1, 2, 3]
const [a, b, c] = num
console.log(a,b,c)

const [first, ,third] = [10, 20, 30]
console.log(first,third) 

const [x, y,...rest] = num
console.log(x,y)
console.log(rest)

//OBJECT DESTRUCTING

const person = {name:"Siva", age:19, city : "Perundurai"}
const {name,age} = person
console.log(name,age)

//MAP

const num1 = [1, 2, 3, 4, 5]
const square = num1.map(num1=>num1*num1)
console.log(square)

//Filter 

const n = [1, 2, 3, 4, 5]
const even  = n.filter(n=>n%2==0)
console.log(even)

//Reduce
const n1 = [1, 2, 3, 4, 5]
const sum = n1.reduce((a,b) => a + b, 0) 
console.log(sum)

//

function sum1(...numbers){
    return numbers.reduce((a,b) => a + b, 0) 
}
console.log(sum1(1,2,3))
console.log(sum1(1,2))

//ARRAYS AND STRING OPERATION

const arr = [1, 2, 3]
arr.push(4)
console.log(arr)
arr.push(5,6)
console.log(arr)

arr.pop()
console.log(arr)

arr.shift(1) // Removes first element
console.log(arr)

console.log(arr.length)

let str1 = "Sujith"
let str2 = "Sujith"
console.log(str1.includes(str2))
console.log(str1.concat(",",str2))
console.log(str1.substring(0,3))
console.log(str1.toUpperCase())
console.log(str1.indexOf("u"))
console.log(str1.toLowerCase())
