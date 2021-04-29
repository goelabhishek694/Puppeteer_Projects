let puppeteer = require("puppeteer");
let fs = require("fs");
// no of videos 
// views 
// watch time -> get 
// list of videos -> [name, duration]
// initial page data get 
// handle -> loader

console.log("Before");
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");
        function intialDetailsfn(selector){
            let arr = document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer");
            let newarr = []
            newarr.push(arr[0].innerText, arr[1].innerText);
            return newarr;
        }
        let initalDetails=await newPage.evaluate(intialDetailsfn,"#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
        console.log(initalDetails);
        function getvideoTitlesAndDuration(titleSelector, durationSelector){
            let titleArr=document.querySelectorAll(titleSelector);
            let durationArr=document.querySelectorAll(durationSelector);
            let newArr=[];
            for(let i=0;i<titleArr.length;i++){
                let title=titleArr[i].innerText;
                let duration=durationArr[i].innerText;
                newArr.push({
                    "Title ":title,
                    "Duration ":duration
                })
            }
            return newArr;
        }
        let videoTitlesAndDuration=await newPage.evaluate(getvideoTitlesAndDuration,"#video-title",".style-scope.ytd-thumbnail-overlay-time-status-renderer span");
        console.log(videoTitlesAndDuration);
        
        
        // evaluate
    } catch (err) {
        console.log(err);
    }

})();