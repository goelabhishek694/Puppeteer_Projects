let puppeteer=require("puppeteer");
let password="abc123";
let email="rijevel498@aramidth.com";
let gTab;
let {codes}=require("./code");

//https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login

let browserWillBeLaunchedPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});

browserWillBeLaunchedPromise
.then(function(browserInstance){
    let newTabPromise=browserInstance.newPage();
    return newTabPromise;
})
.then(function(newTab){
    let newWebPagePromise=newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    gTab=newTab;
    return newWebPagePromise;
})
.then(function(){
    // console.log("webPage is opened");
    let emailWillBeTypedPromise=gTab.type('#input-1', email, {delay:50});
    return emailWillBeTypedPromise;
})
.then(function(){
    let passwordWillBeTypedPromise=gTab.type('#input-2',password,{delay:50});
    return passwordWillBeTypedPromise;
})
.then(function(){
    // console.log("credentials are typed");
    let loginButtonIsClickedPromise=gTab.click("button[data-analytics='LoginPassword']");
    return loginButtonIsClickedPromise;
    // let IPKitPromise=pageNavigation("a>div>.ui-text");
    // return IPKitPromise;
})
.then(function(){
    // console.log("logged in to hackerrank successfully");
    let IPKitPromise=pageNavigation(".card-content h3[title='Interview Preparation Kit']");
    // let warmupChallengesPromise=pageNavigation('a[data-attr1="warmup"]');
    return IPKitPromise;
})
.then(function(){
    // console.log("ipk is clicked");
    let warmupPromise=pageNavigation('a[data-attr1="warmup"]');
    // let allQuesLinks=gTab.$$(".challenge-submit-btn");
    return warmupPromise;
})
.then(function(){
    let url=gTab.url();
    return url;
})
.then(function(url){
    let obj=codes[0];
    return quesSolver(url,obj.qName,obj.soln);
})
.then(function(){
    console.log("ques solved");
})
.catch(function(err){
    console.log("err",err);
})


function pageNavigation(selector){
    // let clickPromise=gTab.click(selector);
    // let waitPromise=gTab.waitForNavigation({waitUntil:"networkidle2"});
    return new Promise(function(resolve,reject){
        let waitSelectorPromise=gTab.waitForSelector(selector,{visible:true});
        waitSelectorPromise
        .then(function(){
            let clickSelectorPromise=gTab.click(selector);
            return clickSelectorPromise;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
    // let selectorPromise=gTab.waitForSelector(selector);
    // let combinedPromise=Promise.all([waitPromise,selectorPromise]);
    // return combinedPromise;
}

function quesSolver(url,qName,soln){
    return new Promise(function(resolve,reject){
        let toPage=gTab.goto(url);
        toPage
        .then(function(){
             //  page h4 -> mathcing h4 -> click
            // function will exceute inside the browser
            function browserconsolerunFn(qName){
                // let allH4Elem=document.querySelectorAll("h4");
                let allH4Elem = document.querySelectorAll("h4");
                let textArr=[];
                for(let i=0;i<allH4Elem.length;i++){
                    let ques=allH4Elem[i].innerText.split("\n")[0];
                    textArr.push(ques);
                    // console.log("hello");
                }
                console.log("hello");
                let idx=textArr.indexOf(qName);
                allH4Elem[idx].click();
            }
            let pageClickPromise=gTab.evaluate(browserconsolerunFn,qName);
            return pageClickPromise;
        })
        .then(function(){
            // checkbox click 
            // resolve();
            let customInputButtonPromise=pageNavigation(".custom-checkbox.inline");
            return customInputButtonPromise;
        })
        .then(function(){
            let typeCodeInCustomInputPromise=gTab.type(".custominput",soln);
            return typeCodeInCustomInputPromise;
        })
        .then(function(){
            // control is pressed 
            let ctrlIsPressedPromise=gTab.keyboard.down("Control");
            return ctrlIsPressedPromise;
        })
        .then(function(){
            let aIsPressedPromise=gTab.keyboard.press("a");
            return aIsPressedPromise;
        })
        .then(function(){
            let xIsPressedPromise=gTab.keyboard.press("x");
            return xIsPressedPromise;
        })
        .then(function(){
            let clickOnEditorPromise=gTab.click(".monaco-editor.no-user-select.mac.vs");
            return clickOnEditorPromise;
        })
        .then(function(){
            let aIsPressedPromise=gTab.keyboard.press("a");
            return aIsPressedPromise;
        })
        .then(function(){
            let vIsPressedPromise=gTab.keyboard.press("v");
            return vIsPressedPromise;
        })
        // .then(function(){

        // })
        .then(function(){
            console.log("code is pasted in editor");
            resolve();
        })
        .catch(function(){
            reject();
        })
    })
}

function 
        

