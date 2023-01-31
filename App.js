/*
API Parameters
❚ Required: function

The time series of your choice. In this case, function=TIME_SERIES_INTRADAY

❚ Required: symbol

The name of the equity of your choice. For example: symbol=IBM

❚ Required: interval
Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 60min

❚ Optional: adjusted

By default, adjusted=true and the output time series is adjusted by historical split and dividend events. Set adjusted=false to query raw (as-traded) intraday values.

❚ Optional: outputsize

By default, outputsize=compact. Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points in the intraday time series; full returns the full-length intraday time series. The "compact" option is recommended if you would like to reduce the data size of each API call.

❚ Optional: datatype

By default, datatype=json. Strings json and csv are accepted with the following specifications: json returns the intraday time series in JSON format; csv returns the time series as a CSV (comma separated value) file.

❚ Required: apikey

Your API key. Claim your free API key here.

key ==> 3KSL9WN0OHTD9PZI
Examples (click for JSON output)
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo */


// fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=3KSL9WN0OHTD9PZI")
// .then((data)=>{
//     console.log(data);
// })
// .catch((srror)=>{
//     console.log("Error");
// });


// fetch("https://jsonplaceholder.typicode.com/todos/")
//   .then((res) => res.json())
//   .then((todoItems) => {
//     console.log(todoItems);
//   })
//   .catch((error) => {
//     console.log("ERROR IN API CALL", error);
//   });


// fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=5min&apikey=3KSL9WN0OHTD9PZI")
//   .then((res) => res.json())
//   .then((Items) => {
//     console.log(Items);
//   })
//   .catch((error) => {
//     console.log("ERROR IN API CALL", error);
//   });


//   const obj ={
//     "Meta Data": {
//         "1. Information": "Intraday (5min) open, high, low, close prices and volume",
//         "2. Symbol": "IBM",
//         "3. Last Refreshed": "2023-01-30 20:00:00",
//         "4. Interval": "5min",
//         "5. Output Size": "Compact",
//         "6. Time Zone": "US/Eastern"
//     },
//     "Time Series (5min)": {
//         "2023-01-30 20:00:00": {
//             "1. open": "135.3700",
//             "2. high": "135.3700",
//             "3. low": "135.3700",
//             "4. close": "135.3700",
//             "5. volume": "248"
//         },
//         "2023-01-30 19:55:00": {
//             "1. open": "135.3900",
//             "2. high": "135.3900",
//             "3. low": "135.3900",
//             "4. close": "135.3900",
//             "5. volume": "285"
//         }
//     }
// }

// console.log(obj["Meta Data"]);
// console.log(obj["Time Series (5min)"]);
// console.log(obj["Time Series (5min)"]["2023-01-30 19:55:00"]["1. open"]);

const myObj = {
    data: {
        "Information": "Intraday (5min) open, high, low, close prices and volume",
        "Symbol": "IBM",
        "Last Refreshed": "2023-01-30 20:00:00",
        "Interval": "5min",
        "Output Size": "Compact",
        "Time Zone": "US/Eastern"
    },
    time : {
        time1 :{
            "open": "135.3700",
            "high": "135.3700",
            "low": "135.3700",
            "close": "135.3700",
            "volume": "248"
        },
        time2:{
            "open": "135.3900",
            "high": "135.3900",
            "low": "135.3900",
            "close": "135.3900",
            "volume": "285"
        },
        time3:{
            "open": "135.3900",
            "high": "135.3900",
            "low": "135.3900",
            "close": "135.3900",
            "volume": "285"
        },
        time4:{
            "open": "135.3900",
            "high": "135.3900",
            "low": "135.3900",
            "close": "135.3900",
            "volume": "285"
        },
        time5:{
            "open": "135.3900",
            "high": "135.3900",
            "low": "135.3900",
            "close": "135.3900",
            "volume": "285"
        }
    }
}

// console.log(myObj["work"]);

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const optionButton = document.querySelectorAll(".option-button");
const intraday = document.getElementById("intraday");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");
const listContainer = document.getElementById("watchlist-container");


// ///////// Active Button /////////////
optionButton.forEach((item)=>{
    item.addEventListener("click",()=>{
        changeActiveItem();
        item.classList.add("active");
        // console.log(item.value);
    })
});

const changeActiveItem = ()=>{
optionButton.forEach((item)=>{
    item.classList.remove("active");
})
};

// //////// Taking Data from Input ///////////
const myWatchlist = [];

searchButton.addEventListener("click", ()=>{
let symbol = searchInput.value;
// console.log(symbol);
let type = document.querySelector(".option-button.active").value;
// console.log(type);
changeActiveItem();
searchInput.value = "";


 // here to fetch API based on the symbol and type

let fetchSymbol = myObj["data"]["Symbol"];
let fetchType = myObj["data"]["Information"].split(" ")[0];

let output = myObj["time"];
let openPrice = Object.keys(output);
let currentPrice = output[openPrice[0]].open;
let oldPrice = output[openPrice[1]].open;
 
// console.log(oldPrice);
// console.log(currentPrice);



createNewListElement(symbol, currentPrice, oldPrice, type);



// then ()
// if(symbol === fetchSymbol && type === fetchType ){
//     // console.log("you are going Good");
// }
// else {
//     console.log("Wrong Selection")
// }

});


function createNewListElement(symbol, currentPrice, oldPrice, type){
let listItem = document.createElement("ul");

listItem.setAttribute("class","watchlist");
listItem.innerHTML = `<li class="list-element symbol">${symbol}</li>
            <li class="list-element price">${currentPrice}</li>
            <li class="list-element time">${type}</li>
            <li class="list-element close">
            <i class="fa-solid fa-xmark"></i>
            </li>`;

// console.log(listItem); 

// let priceElement = document.getElementsByClassName("price");
// if(oldPrice>currentPrice){
//     priceElement.classList.add("bg-red");
// } else if(oldPrice<currentPrice){
//     priceElement.classList.add("bg-green");
// }

listContainer.append(listItem);  
console.log(listContainer); 
// return listItem;
}



// listContainer.addEventListener("keydown",()=>{});

// listContainer.addEventListener("keyup", (event) => {
//   if (event.keyCode === 13) {
//     console.log('Enter key pressed')
//   }
// });


// https://sentry.io/answers/save-arrays-objects-browser-storage/#:~:text=The%20code%20example%20below%20shows,jsonArray%20as%20the%20value%20localStorage.

//     let output = myObj["time"];
//    Object.keys(output).forEach(key => {
//   console.log(key, output[key]);
// });