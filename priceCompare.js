let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com/"];
let pName = process.argv[2];
let gTab;
console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        await getListingFromAmazon(links[0], browserInstance,pName);
        await getListingFromFlipkart(links[1], browserInstance,pName);
    } 
    catch (err) {
        console.log(err);
    }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print 
async function getListingFromAmazon(link, browserInstance, pName) {
    let newTab= await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.type('#twotabsearchtextbox',pName,{delay:50});
    await newTab.click("#nav-search-submit-button");
    await newTab.waitForSelector(".a-price-whole",{visible:true});
    // await document.querySelector("")
    function consoleFn(pNameSelector, priceSelector){
        let productArr=document.querySelectorAll(pNameSelector);
        let priceArr=document.querySelectorAll(priceSelector);
        let details=[];
        for(let i=0;i<5;i++){
            let product=productArr[i].innerText;
            let price=priceArr[i].innerText;
            details.push({
                "Product":product,
                "Price":price
            });
        }
        return details;
    }
    let detailsArr=await newTab.evaluate(consoleFn,".a-size-medium.a-color-base.a-text-normal",".a-price-whole");
    console.table(detailsArr);
}

async function getListingFromFlipkart(link, browserInstance, pName){
    let newTab=await browserInstance.newPage();
    await newTab.goto(link);
    await newTab.click("._2KpZ6l._2doB4z");
    await newTab.type("._3704LK",pName);
    await newTab.click("button[type='submit']");
    await newTab.waitForSelector("._30jeq3._1_WHN1",{visible:true});
    function consoleFn(pNameSelector,priceSelector){
        let productArr=document.querySelectorAll(pNameSelector);
        let priceArr=document.querySelectorAll(priceSelector);
        let details=[];
        for(let i=0;i<5;i++){
            let product,price;
            if(productArr[i]){
                product=productArr[i].innerText;
            }
            else product="no product";
            if(priceArr[i]){
                price=priceArr[i].innerText;
            }
            else price='0';

            details.push({
                'Product ': product,
                'Price ':price
            })
        }
        return details;
    }

    let detailsArr=await newTab.evaluate(consoleFn,"._4rR01T","._30jeq3._1_WHN1");
    console.table(detailsArr);

}