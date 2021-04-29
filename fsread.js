let fs=require("fs");
console.log("Before");

let promise=fs.promises.readFile("f1.txt");

// console.log("Initial state ",promise);
// console.log("After");

// setTimeout(function(){
//     console.log("final state ",promise);
// },4000);

promise
.then(function(data){
    console.log(data);
})
promise.catch(function(err){
    console.log("err",err);
})
console.log("Initial state ",promise);
console.log("After");

