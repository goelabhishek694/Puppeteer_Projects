let puppeteer=require('puppeteer');

let browserWillBeLaunchedPromise=puppeteer.launch({
    headless:false
});
// callback hell
// browserWillBeLaunchedPromise
// .then(function(browserInstance){
//     console.log("browser is opened");
//     let newPagePromise=browserInstance.newPage();
//     newPagePromise
//     .then(function(newPage){
//         console.log("new tab is opened");
//         let page=newPage.goto("https://www.pepcoding.com");
//         page
//         .then(function(){
//             console.log("Page is opened");
//         })
//     })
// })

browserWillBeLaunchedPromise
.then(function(browserInstance){
    console.log("browser is opened");
    let newPagePromise=browserInstance.newPage();
    return newPagePromise;
})
.then(function(newPage){
    console.log("new tab is opened");
    let newWebpagePromise=newPage.goto("https://www.pepcoding.com");
    return newWebpagePromise;
})
.then(function(){
    console.log("new WebPage is opened");
    browserWillBeLaunchedPromise.close();
})
.catch(function(err){
    console.log("err",err);
})
    
